function checkIsProperNumber (value, variableName){
    if(typeof value !== 'number') throw `${variableName} is not a number`;
}

module.exports = {
    description: "This is a calculator for lecture 2",
    addTwoNumbers: (n1,n2) => {
        checkIsProperNumber(n1, "First input");
        checkIsProperNumber(n2, "Second input");
        return n1 + n2;
    },
    subtractTwoNumbers: (n1,n2) => {
        checkIsProperNumber(n1, "First input");
        checkIsProperNumber(n2, "Second input");
        return n1 - n2;
    },
    multiplyTwoNumbers: (n1,n2) => {
        checkIsProperNumber(n1, "First input");
        checkIsProperNumber(n2, "Second input");
        return n1 * n2;
    },
    divideTwoNumbers: (n1,n2) => {
        checkIsProperNumber(n1, "First input");
        checkIsProperNumber(n2, "Second input");
        if(n2 === 0) throw "Can not divide by 0";
        return n1 / n2;
    }
}