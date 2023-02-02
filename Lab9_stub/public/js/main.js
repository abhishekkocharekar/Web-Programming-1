/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/
let odd = true;
$('#myForm').submit((event) => {
    event.preventDefault();
    if($('#inputArray').val()) {
        $('#error').hide();
        let input = $('#inputArray').val();
        let finalArray;
        try{
            finalArray = sortArrays(input);
        }catch(e){
            console.log("Error: ",e);
            $('#error').show();
            $('#error').html(e);
            return;
        }
        let li;
        if(odd === true){
            li = `<li class = "is-green">[${finalArray}]</li>`;
            odd = false;
        } else {
            li = `<li class = "is-red">[${finalArray}]</li>`;
            odd = true;
        }
        $('#results').append(li);
        $('#myForm').trigger('reset');
        $('#inputArray').focus();
    }
    else{
        $('#error').show();
        $('#error').html("Error: The Input can not be empty");
    }
});

const sortArrays = (input) => {

    if(input.trim().length === 0) throw `Error: the Input can not contain only spaces`;
    input = input.trim();
    let whitespaceRemoved = input.replace(/\s/g, '');
    if(whitespaceRemoved.includes("-0")) throw `Error: Invalid Input "-0"`;
    let lastChar = whitespaceRemoved[whitespaceRemoved.length - 1];
    let lastTwoChar = whitespaceRemoved.slice(-2);
    if(lastChar !== "]" && lastTwoChar !== "],") throw `Error: The input should end with "]" or one trailing ","`
    whitespaceRemoved = whitespaceRemoved.split("],");
    const specialCharsWithoutNumbers = /[`!@#$%^&*()_+\={};':"\\|.<>\/?~]/g;
    whitespaceRemoved.forEach(element => {
        if(element.match(specialCharsWithoutNumbers)) throw `Error: Input can not contain special characters`;  
    });
    
    let array = [];
    for(let i=0; i<whitespaceRemoved.length; i++){
        let flag = true;
        if(i+1 === whitespaceRemoved.length){
            if(whitespaceRemoved[i].length === 0) {
                flag = false; 
            } 
            if(flag) {
                array[i] = whitespaceRemoved[i].slice(1,-1);
                flag = false;
            }
        }
        if(flag) {
            if(whitespaceRemoved[i][0] !== "[") throw `Error: The input can only contain valid arrays of numbers`;
            array[i] = whitespaceRemoved[i].slice(1);
        }
    }
    let newArray = [];
    array.forEach(element => {
        newArray.push(element.split(","));
    });
    let finalArray = [];
    newArray.forEach(element => {
        element.forEach(data => {
            if(data === "") throw `Error: Each array should be valid`
            if(data.includes(".")) throw `Error: Decimals values are not allowed`;
            finalArray.push(Number(data));
        });
    });
    finalArray.forEach(data => {
        if(typeof(data) !== 'number' || isNaN(data)) throw `Error: The input must contain valid arrays of numbers`;
    });
    finalArray.sort();
    return finalArray;

};