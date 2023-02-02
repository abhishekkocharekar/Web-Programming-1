//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const validId = (id) => {
    if(id.includes(".")) throw `Invalid URL Parameter`;
    id = Number(id);
    if(!id) throw 'Invalid URL Parameter';
    if(typeof (id) != "number" || Number.isNaN(id)) throw 'Invalid URL Parameter';
    if(id <= 0) throw `Invalid URL Parameter`;
}

module.exports = {
    validId
}