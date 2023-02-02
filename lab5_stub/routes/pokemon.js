const express = require('express');
const router = express.Router();
const pokemonData = require('../data');
const helper = require("../helpers");

router
  .route('/pokemon')
  .get(async (req, res) => {
    try {
      const post = await pokemonData.pokemon();
      res.json(post);
    } catch (e) {
      res.status(404).json({error: e});
    }
  });

router
  .route('/pokemon/:id')
  .get(async (req, res) => {
    try {
      try{
        helper.validId(req.params.id);
        req.params.id = req.params.id.trim();
      }catch(e){
        res.status(400).json({error: e});
        return;
      }
      const post = await pokemonData.pokemonById(req.params.id);
      res.json(post);
    } catch (e) {
      res.status(404).json({error: e});
    }
  });

module.exports = router;

