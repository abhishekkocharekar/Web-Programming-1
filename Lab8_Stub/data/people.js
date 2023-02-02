//Axios call to get all data
const axios = require("axios");
const helper = require("../helper");
const getAllPeople = async () => {
    try{
        const { data } = await axios.get(`https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json`);
        return data;
    }catch(e){
        console.log (e);
    }
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    helper.searchValidation(searchPersonName);
    searchPersonName = searchPersonName.trim();
    const data = await getAllPeople();
    searchPersonName = searchPersonName.trim();
    searchPersonName = searchPersonName.toLowerCase();
    let result = [];
    data.forEach(element => {
        if(element.firstName.toLowerCase().includes(searchPersonName) || element.lastName.toLowerCase().includes(searchPersonName)){
            if(result.length < 20){
                result.push(element);
            }
        }
    });
    if(result.length === 0) throw 'Not Found';
    return result;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    helper.idValidation(id);
    id = id.trim();
    const data = await getAllPeople();
    let result = undefined;
    data.forEach(element => {
        if(element.id.toString() === id){
            result = element;
        }
    });
    if(result == undefined) throw 'Not Found';
    return result;
};

module.exports = { searchPeopleByName, searchPeopleByID };
