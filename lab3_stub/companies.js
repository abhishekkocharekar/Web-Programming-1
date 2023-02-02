const axios = require("axios");
const people = require("./people");

async function getCompanies(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
        return data;
    }catch(e){
        console.log ("Error:",e);
    }
}

const listEmployees = async (companyName) => {
    if(typeof(companyName) !== 'string') throw `Input must be a string`;
    if(companyName.trim().length === 0) throw `String can not be empty`;
    const peopleData = await people.getPeople();
    const companyData = await getCompanies();
    const companyObject = companyData.find(data => data.name.toLowerCase() === companyName.toLowerCase());
    if(!companyObject) throw  `There is no company with the name "${companyName}"`;
    employees = [];
    peopleData.forEach(data => {
        if(data.company_id === companyObject.id) employees.push(`${data.last_name}$$$${data.first_name}`);
    });
    employees.sort();
    for(let i=0; i<employees.length; i++){
        let temp = employees[i].split("$$$");
        employees[i] = `${temp[1]} ${temp[0]}`;
    }
    companyObject['employees'] = employees;
    return companyObject;
};

const sameIndustry = async (industry) => {
    if(typeof(industry) !== 'string') throw `Input must be a string`;
    if(industry.trim().length === 0) throw `String can not be empty`;
    const companyData = await getCompanies();
    let result = companyData.filter(data => data.industry.toLowerCase() === industry.toLowerCase());
    if(result.length === 0) throw `There is no company in the "${industry}" industry`;
    return result;
};

const getCompanyById = async (id) => {
    if(typeof(id) !== 'string') throw `Input must be a string`;
    if(id.trim().length === 0) throw `String can not be empty`;
    const companyData = await getCompanies();
    const result = companyData.find(data => data.id === id);
    if(!result) throw `"${id}". Company with this id does not exist`;
    return result;
};

module.exports = {
    listEmployees,
    sameIndustry,
    getCompanyById
};
