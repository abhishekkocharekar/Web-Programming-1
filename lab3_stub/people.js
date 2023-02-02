const axios = require("axios");

async function getPeople(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
        return data;
    }catch(e){
        console.log (e);
    }
}

const getPersonById = async (id) => {
    if(typeof(id) !== 'string') throw `Input must be a string`;
    if(id.trim().length === 0) throw `String can not be empty`;
    const peopleData = await getPeople();
    const result = peopleData.find(data => data.id === id);
    if(!result) throw `"${id}". This id does not exist`;
    return result;
};

const sameJobTitle = async (jobTitle) => {
    if(typeof(jobTitle) !== 'string') throw `Input must be a string`;
    if(jobTitle.trim().length === 0) throw `String can not be empty`;
    const peopleData = await getPeople();
    let result = peopleData.filter(data => jobTitle.toLowerCase() === data.job_title.toLowerCase());
    if(result.length < 2) throw `There are no two people with job titled "${jobTitle}"`;
    return result;
};

const getPostalCodes = async (city, state) => {
    if(typeof(city) !== 'string' || typeof(state) !== 'string') throw `Input must be a string`;
    if(city.trim().length === 0 || state.trim().length === 0) throw `String can not be empty`;
    const peopleData = await getPeople();
    let result = [];
    peopleData.forEach(data => {
        if(data.city.toLowerCase() === city.toLowerCase() && data.state.toLowerCase() === state.toLowerCase()) 
            result.push(Number(data.postal_code));
    });
    if(result.length === 0) throw  `There are no postal_codes for the given city and state combination`;
    return result;
};

const sameCityAndState = async (city, state) => {
    if(typeof(city) !== 'string' || typeof(state) !== 'string') throw `Input must be a string`;
    if(city.trim().length === 0 || state.trim().length === 0) throw `String can not be empty`;
    const peopleData = await getPeople();
    let result = [];
    peopleData.forEach(data => {
        if(data.city.toLowerCase() === city.toLowerCase() && data.state.toLowerCase() === state.toLowerCase()) {
            result.push(`${data.last_name}$$$${data.first_name}`);
        }
    });
    if(result.length < 2) throw  `There are less than 2 people in the same city and state`;
    result.sort();
    for(let i=0; i<result.length; i++){
        let temp = result[i].split("$$$");
        result[i] = `${temp[1]} ${temp[0]}`;
    }
    return result;
};

module.exports = {
    getPeople,
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState
};
