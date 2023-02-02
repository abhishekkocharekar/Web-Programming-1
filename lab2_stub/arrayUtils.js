let arrayStats = (array) => {
  if (!Array.isArray(array)) throw `Input must be an array`;
  if (array.length < 1) throw `Array should not be empty`;
  array = array.sort((a,b) => a-b);
  let sum = 0;
  let tempObject = {}
  array.forEach(element => {
    if (typeof (element) != "number" || Number.isNaN(element)) throw `Array can only contain numbers`;
    sum = sum + element;
    if(!tempObject[element]) tempObject[element] = 1;
    else tempObject[element] = tempObject[element] + 1;
  });
  let result = {};
  result.mean = Number((sum / array.length).toFixed(2));
  if (array.length % 2 === 0) result.median = (array[array.length / 2] + array[array.length / 2 - 1]) / 2;
  else result.median = Number((array[array.length / 2 - 0.5]).toFixed(2));
  let max = 0;
  let arr = [0];
  for (const i in tempObject) {
      if(tempObject[i] > 1 && max < tempObject[i]){
          max = tempObject[i];
          arr = [Number(i)];
      } else if(max === tempObject[i]) arr.push(Number(i))
  }
  if(arr.length > 1) result.mode = arr;
  else result.mode = Number(arr[0].toFixed(2));
  result.range = array[array.length - 1] - array[0];
  result.minimum = array[0];
  result.maximum = (array[array.length - 1]);
  result.count = array.length;
  result.sum = sum;
  return result;
};

let makeObjects = (...arrays) => {
  if(arrays.length < 1) throw `Input can not be empty`;
  let result = {}
  arrays.forEach(element => {
    if(!Array.isArray(element)) throw `${element} is not an array`;
    if(element.length !== 2) throw `[${element}] has ${element.length} element(s)`;
    result[element[0]] = element[1];
  })
  return result;
};

let commonElements = (...arrays) => {
  if (!Array.isArray(arrays)) throw `Input must be an array`;
  if(arrays.length < 2) throw `Please Enter atleast two arrays`;
  if(!Array.isArray(arrays[0])) throw `${arrays[0]} is not an array`;
  let result = [];
  arrays[0].forEach(element => {
    let isArray = Array.isArray(element);
    let flag = true;
    for(const array of arrays){
      if(!Array.isArray(array)) throw `${array} is not an array`;
      if(arrays.indexOf(array) === 0) continue;
      if(isArray){
        let isArray2 = false
        array.map(data => {
          if(Array.isArray(data)){
            isArray2 = true;
            if(!equalArrays(element,data)) {
              flag = false; 
            }
          }
        });
        if(!isArray2){
          flag = false;
        }
        if(!flag) {
          continue;
        }
      }else if(!array.includes(element)){
        flag = false; 
        continue;
      }
    }
    if(flag){
      if(!result.includes(element)){
        result.push(element);
      }
    }
  })
  return result;
};

let equalArrays = (a,b) => {
  if(a.length != b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if(Array.isArray(a[i]) && Array.isArray(b[i])){
      if(!equalArrays(a[i],b[i])) {
        return false;
      }
      else {
        continue;
      }
    }
    if (a[i] !== b[i]){
      return false;
    }
  }
  return true;
}

module.exports = {
  arrayStats,
  makeObjects,
  commonElements
}