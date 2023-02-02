const calculator = require('./calculator');

try{
    console.log(calculator.addTwoNumbers(1,2));
}catch(e){
    console.log("Error", e)
}

try{
    console.log(calculator.subtractTwoNumbers(1,2));
}catch(e){
    console.log("Error", e)
}

try{
    console.log(calculator.multiplyTwoNumbers(10,5));
}catch(e){
    console.log("Error", e)
}

try{
    console.log(calculator.divideTwoNumbers(10,0));
}catch(e){
    console.log("Error", e)
}






