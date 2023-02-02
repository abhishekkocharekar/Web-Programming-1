//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const specialCharsWithoutNumbers = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
const checkSpaces = /\s/g;
const upperCase = /[A-Z]/g;
const numbers = /[0-9]/g;


const validUsername = (str) => {
    if (!str) throw 'Username can not be empty';
    if (typeof str !== 'string') throw 'Username must be a string';
    if (str.trim().length === 0) throw 'Username cannot be an empty string or just spaces';
    if (str.length < 4) throw 'Username must contain atleast 4 characters';
    if(str.match(specialCharsWithoutNumbers)) throw `Username can only be alphanumeric without any spaces`;
    if(str.match(checkSpaces)) throw `Username can not contain any spaces`;
}

const validPassword = (str) => {
    if (!str) throw 'Password can not be empty';
    if (typeof str !== 'string') throw 'Password must be a string';
    if (str.trim().length === 0) throw 'Password cannot be an empty string or just spaces';
    if (str.length < 6) throw 'Password must contain atleast 6 characters';
    if(str.match(checkSpaces)) throw `Password can not contain any spaces`;
    if(!str.match(upperCase)) throw `Password must contain atleast one uppercase letter`;
    if(!str.match(numbers)) throw `Password must contain atleast one number`;
    if(!str.match(specialCharsWithoutNumbers)) throw `Password must contain atleast one special character`;
}

module.exports = {
    validUsername,
    validPassword
};