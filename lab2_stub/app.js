const arrayUtils = require("./arrayUtils");
const objectUtils = require("./objectUtils");
const stringUtils = require("./stringUtils");

try{
    console.log(arrayUtils.arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]));
    console.log(arrayUtils.arrayStats("banana"));
}catch(e){
    console.log("Error:", e);
}

try{
    console.log(arrayUtils.makeObjects([4, 1], [1, 2]));
    console.log(arrayUtils.makeObjects());
}catch(e){
    console.log("Error:", e);
}

const arr1 = [5, 7]; 
const arr2 = [20, 5]; 
const arr3 = [true, 5, 'Patrick']; 
const arr4 = ["CS-546", 'Patrick']; 
const arr5 = [67.7, 'Patrick', true]; 
const arr6 = [true, 5, 'Patrick']; 
const arr7 = [undefined, 5, 'Patrick']; 
const arr8 = [null, undefined, true];
const arr9 = ["2D case", ["foo", "bar"], "bye bye"]
const arr10= [["foo", "bar"], true, "String", 10]

try{
    console.log(arrayUtils.commonElements(arr9,arr6));
    console.log(arrayUtils.commonElements("yash"));
}catch(e){
    console.log(e);
}

try{
    console.log(stringUtils.palindromes("Hi mom, At noon, I'm going to take my kayak to the lake")); 
    console.log(stringUtils.palindromes(["asdf"])); 
}catch(e){
    console.log(e);
}

try{
    console.log(stringUtils.replaceChar("Mommy"));
    console.log(stringUtils.replaceChar());
}catch(e){
    console.log(e);
}

try{
    console.log(stringUtils.charSwap("Patrick", "Hill"));
    console.log(stringUtils.charSwap("h","e"));
}catch(e){
    console.log(e);
}

const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

try{
    console.log("this",objectUtils.deepEquality({b:2, a:2, c:{d:[1,2,3, {z:true, y:false}], e:NaN, f:{g: undefined, h:{}}}}, {a:2, c:{f:{h:{}, g: undefined}, e:NaN, d:[1,2,3, {z: true, y:false}]}, b:2}));
    console.log(objectUtils.deepEquality([1,2,3], [1,2,3]));
}catch(e){
    console.log(e);
}

const first123 = {name: {first: "Patrick", last: "Hill"}, age: 46};
const second123 = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
const third123 = {a: 2, b: {c: true, d: false}};
const forth123 = {b: {c: true, d: false}, foo: "bar"};

try{
    console.log(objectUtils.commonKeysValues(first123, second123));
    console.log(objectUtils.commonKeysValues([1,2,3], [1,2,3]));
}catch(e){
    console.log(e);
}

try{
    console.log(objectUtils.calculateObject({ a: 3, b: 7, c: 5 },  n => n * 2));
    console.log(objectUtils.calculateObject({ a: 3, b: 7, c: 5 },  "function"));
}catch(e){
    console.log(e);
}