let palindromes = (string) => {
      if(typeof(string) !== 'string') throw `Input must be a string`;
      if(string.trim().length === 0) throw `String can not be empty`;
      if(string.length <= 2) return [];
      const specialChars = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
      let result = [];
      string.toLowerCase().replace(specialChars, "").split(" ").forEach(element => {
            if(element.length <= 2) return;
            let flag = 1;
            for(let i=0; i<element.length/2; i++){
                  if(element[i] !== element[element.length - 1 - i]) {
                        flag = 0;
                        break;
                  }
            }
            if(flag) result.push(element);
      });
      return result;
};

let replaceChar = (string) => {
      if(typeof(string) !== 'string') throw `Input must be a string`;
      if(string.trim().length === 0) throw `String can not be empty`;
      for(let i=0; i<string.length; i++){
            if((i+1) % 4 === 0){
                  string = `${string.substring(0,i)}$${string.substring(i + 1)}`;
            }else if((i+1) % 2 === 0){
                  string = `${string.substring(0,i)}*${string.substring(i + 1)}`;
            }
      }
      return string;
};

let charSwap = (string1, string2) => {
      if(typeof(string1) !== 'string' || typeof(string2) !== 'string') throw `Inputs must be strings`;
      if(string1.trim().length <= 4 || string2.trim().length <= 0) throw `Length of each string must be 4`;
      return `${string2.substring(0,4)}${string1.substring(4)} ${string1.substring(0,4)}${string2.substring(4)}`;
};

module.exports = {
      palindromes,
      replaceChar,
      charSwap
}