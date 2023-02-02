    
const basicString = (str) => {
    if (!str) throw 'Input can not be empty';
    if (typeof str !== 'string') throw 'Input must be a string';
    if (str.trim().length === 0) throw 'Input cannot be an empty string or just spaces';
}

const isArray = (val) => {
    if (!Array.isArray(val)) throw `Input must be an array`;
    if (val.length < 1) throw `Array should not be empty`;
}

const validName = (val) => {
    const specialCharsWithNumbers = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    if(val.match(specialCharsWithNumbers)) throw `Name can only contain A-Z`;
    temp = val.split(" ");
    if(temp.length != 2 || temp[0].length < 3 || temp[1].length < 3) throw `There should be only one space between the fist name and last name and length of each should be atleast 3`;
}

module.exports = {
    basicString,
    isArray,
    validName
};
    
