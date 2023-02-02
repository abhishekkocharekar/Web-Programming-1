const questionOne = function questionOne(arr) {
    for(let i=0; i < arr.length; i++){
        const checkForNumbers = /[0-9]/;
        if(checkForNumbers.test(arr[i])){
            if(arr[i] <= 1){
                arr[i] = false;
                continue;
            }
            if(arr[i] === 2){
                arr[i] = true;
                continue;
            }
            let n = 2;
            let element = arr[i];
            let flag = 1;
            while(n < element){
                if(element % n === 0){
                    arr[i] = false;
                    flag = 0;
                    break;
                }
                n++;
            }
            if(flag){
                arr[i] = true;
            }
        }
    }
    return arr;
} 

const questionTwo = function questionTwo(startingNumber, commonRatio, numberOfTerms) { 
    if(startingNumber === 0 || commonRatio === 0){
        return 0;
    }
    if(numberOfTerms <= 0 || numberOfTerms % 1 !== 0){
        return NaN;
    }
    let result = startingNumber * ((1 - commonRatio**numberOfTerms)/(1 - commonRatio));
    return result;
} 

const questionThree = function questionThree(text) { 
    let sum = 0;
    text = text.toLowerCase()
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    for(i of text){
        if(i !== 'a' && i !== 'e' && i !== 'i' && i !== 'o' && i !== 'u' && i !== '0' && i !== '1' && i !== '2' && i !== '3' 
            && i !== '4' && i !== '5' && i !== '6' && i !== '7' && i !== '8' && i !== '9' && i !== ' ' && !specialChars.test(i)){
            sum++;
        }
    }
    return sum;
} 

const questionFour = function questionFour(fullString, substring) {
    return fullString.split(substring).length -1; 
}

module.exports = { 
    firstName: "Abhishek", 
    lastName: "Kocharekar", 
    studentId: "20012476", 
    questionOne, 
    questionTwo, 
    questionThree, 
    questionFour 
};