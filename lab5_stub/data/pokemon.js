const axios = require("axios");
const helper = require("../helpers");

const pokemon = async () => {
    try{
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
        return data;
    }catch(e){
        console.log (e);
    }
};

const pokemonById = async (id) => {
    try{
        helper.validId(id);
        id = id.trim();
    }catch(e){
        return e;
    }
    
    try{
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return data;
    }catch(e){
        throw `Pokémon Not Found!`;
    }
};

module.exports = {
    pokemon,
    pokemonById
};