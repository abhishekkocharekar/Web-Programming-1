const {ObjectId} = require('mongodb');

const basicString = (str) => {
    if (!str) throw 'Input can not be empty';
    if (typeof str !== 'string') throw 'Input must be a string';
    if (str.trim().length === 0) throw 'Input cannot be an empty string or just spaces';
}

const isArray = (val) => {
    if (!Array.isArray(val)) throw `Input must be an array`;
    if (val.length < 1) throw `Array should not be empty`;
}

const validObjectID = (id) => {
    basicString(id);
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
}

const validName = (val) => {
    const specialCharsWithNumbers = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    if(val.match(specialCharsWithNumbers)) throw `Name can only contain A-Z`;
    temp = val.split(" ");
    if(temp.length != 2 || temp[0].length < 3 || temp[1].length < 3) throw `There should be only one space between the fist name and last name and length of each should be atleast 3`;
}

const createReviewValidation = (reviewTitle,
    reviewerName,
    review,
    rating) => {
    
        basicString(reviewTitle);
        basicString(reviewerName);
        basicString(review);

        reviewTitle.trim();
        reviewerName.trim();
        review.trim();

        if (typeof (rating) != "number" || Number.isNaN(rating)) throw `Rating can only contain numbers`;
        if(rating < 1 || rating > 5) throw `Rating should be between 1 - 5`;

        if(rating - Math.floor(rating) > 0){
            if((rating - Math.floor(rating)).toString().length > 3) throw `please enter only one decimal value`;
        }


}

const specialCharsWithNumbers = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
const specialCharsWithoutNumbers = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
const specialCharsWithoutPunctuations = /[`!@#$%^&*()_+\-=\[\]{};:\\|<>\/?~]/g;

const createMovieValidation = (title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime) => {

        basicString(title);
        basicString(plot);
        isArray(genres);
        basicString(rating);
        basicString(studio);
        basicString(director);
        isArray(castMembers);
        basicString(dateReleased);
        basicString(runtime);

        title.trim();
        plot.trim();
        rating.trim();
        studio.trim();
        director.trim();
        dateReleased.trim();
        runtime.trim();

        if(title.match(specialCharsWithoutNumbers) || title.length < 2) throw `Invalid Title`;

        if(studio.match(specialCharsWithoutPunctuations) || studio.length < 5) throw `Invalid Title`;

        validName(director);

        if(rating !== "G" && rating !== "PG" && rating !== "PG-13" && rating !== "R" && rating !== "NC-17") throw `Invalid rating`;

        for(i=0; i<genres.length; i++){
            basicString(genres[i]);
            genres[i] = genres[i].trim();
            if(genres[i].match(specialCharsWithNumbers) || genres[i].length < 5) throw `Invalid Genre`;
        }

        for(i=0; i<castMembers.length; i++){
            basicString(castMembers[i]);
            castMembers[i] = castMembers[i].trim();
            validName(castMembers[i]);
        }

        const date = new Date();
        if(dateReleased.slice(2,3) !== "/" || dateReleased.slice(5,6) !== "/") throw `Date must be in the mm/dd/yyyy format`;

        let month = Number(dateReleased.slice(0,2));
        let day = Number(dateReleased.slice(3,5));
        let year = Number(dateReleased.slice(6));

        if(Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(year)) throw `day, month and year must be numbers`;
        if(year > Number(date.toLocaleDateString().slice(-4)) + 2) throw `Relese date must be withing 2 years of the current date`;
        if(year < 1900) throw `Relese date can not be lower than 1990`;
        if(month < 1 || month > 12) throw `Month must be between 1-12`;
        if(day < 1 || day > 31) throw `Day must be between 1-31`;
        if(month=== 2 && day > 28) throw `February can not contain more than 28 days`;
        if(month === 4 || month === 6 || month === 9 || month === 11){
            if(day > 30) throw `Date can not be 31 for the month ${day}`;
        }

        let temp = runtime.split(" ");
        if(temp.length > 2) throw `The runtime must be in "#h #min" format`;

        if(temp[0].slice(-1) !== "h" || temp[1].slice(-3) !== "min") throw `The runtime must be in "#h #min" format`;

        if(temp[0].match(specialCharsWithoutNumbers) || temp[1].match(specialCharsWithoutNumbers)) throw `The runtime can not contain special characters`;

        temp[0] = Number(temp[0].replace("h",""));
        temp[1] = Number(temp[1].replace("min",""));

        if (typeof (temp[0]) != "number" || Number.isNaN(temp[0])) throw `The runtime must be in "#h #min" format`;
        if (typeof (temp[1]) != "number" || Number.isNaN(temp[1])) throw `The runtime must be in "#h #min" format`;

        if(temp[0] < 1) throw `The length of the movie should be atleast 1 hour`;
        if(temp[1] > 59 || temp[1] < 0) throw `The value of mins should be 0-59`;
}

module.exports = {
    basicString,
    isArray,
    validName,
    createMovieValidation,
    createReviewValidation,
    validObjectID
};
    
