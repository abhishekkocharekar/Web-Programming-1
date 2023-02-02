let arr = {};

let equalObjects = (obj1, obj2) => {
      for(const i in obj1){
            if((typeof(obj1[i]) === "object" && !Array.isArray(obj1[i]) && obj1[i] !== null) && obj2[i] !== undefined){
                  return equalObjects(obj1[i],obj2[i])
            } 
            if(obj2[i] === undefined || obj2[i] !== obj1[i]) return false
      }
      return true
}

let equalObjects2 = (obj1, obj2) => {
      for(const i in obj1){
            if((typeof(obj1[i]) === "object" && !Array.isArray(obj1[i]) && obj1[i] !== null) && obj2[i]){
                  if(equalObjects(obj1[i],obj2[i])) arr[i] = obj1[i];
                  equalObjects2(obj1[i],obj2[i]);
            }
            if(obj2[i] !== undefined && obj2[i] === obj1[i]) arr[i] = obj1[i];
      }
      return arr
}

let deepEquality = (obj1, obj2) => {
      if(typeof(obj1) !== "object" || Array.isArray(obj1) || obj1 === null) throw `Invalid Input`;
      if(typeof(obj2) !== "object" || Array.isArray(obj2) || obj2 === null) throw `Invalid Input`;
      return equalObjects(obj1,obj2);
};

let commonKeysValues = (obj1, obj2) => {
      if(typeof(obj1) !== "object" || Array.isArray(obj1) || obj1 === null) throw `Invalid Input`;
      if(typeof(obj2) !== "object" || Array.isArray(obj2) || obj2 === null) throw `Invalid Input`;
      return equalObjects2(obj1, obj2);
};

let calculateObject = (object, func) => {
      if(typeof(object) !== "object" || Array.isArray(object) || object === null) throw `SFirst input must be an object`;
      if(typeof(func) !== "function") throw `Second input must be a function`;
      let result = {};
      for(const i in object){
            if(typeof(object[i]) !== "number"  || Number.isNaN(object[i])) throw `Object should only contain numbers`;
            result[i] = ((func(object[i]))**(1/2)).toFixed(2);
      }
      return result;
};

module.exports = {
      deepEquality,
      commonKeysValues,
      calculateObject
}