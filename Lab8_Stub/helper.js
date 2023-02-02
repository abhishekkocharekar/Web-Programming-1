const idValidation = (id) => {
    if(id.includes(".")) throw `Id can not contain "."`;
    id = Number(id);
    if(!id) throw 'Id can not be empty';
    if(typeof (id) != "number" || Number.isNaN(id)) throw 'Id should be a number';
    if(id <= 0) throw `Id can not be less than 1`;
}

const searchValidation = (name) => {
    if(!name) throw 'Input can not be empty';
    if(name.trim().length === 0) throw 'Input can not be empty';
    const specialCharsWithNumbers = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    if(name.match(specialCharsWithNumbers)) throw `Input can only contain A-Z`;
}

module.exports = {
    idValidation,
    searchValidation
};