//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const helpers = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const post = await movieData.getAllMovies();
      res.json(post);
    } catch (e) {
      res.status(404).json({error: e});
      return;
    }
  })
  .post(async (req, res) => {
    const data = req.body;
    const { title,
      plot,
      genres,
      rating,
      studio,
      director,
      castMembers,
      dateReleased,
      runtime} = data;
      try {
        helpers.createMovieValidation(title,
          plot,
          genres,
          rating,
          studio,
          director,
          castMembers,
          dateReleased,
          runtime);
      }catch(e) {
        res.status(400).json({error: e});
        return;
      }
      try {
        const post = await movieData.createMovie(title,
          plot,
          genres,
          rating,
          studio,
          director,
          castMembers,
          dateReleased,
          runtime);
        res.status(200).json(post);
      } catch (e) {
        res.status(404).json({error: e});
      }

  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    try{
      helpers.validObjectID(req.params.movieId);

    }catch(e){
      res.status(400).json({error: e});
      return;
    }
    try {
      const post = await movieData.getMovieById(req.params.movieId);
      res.json(post);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    try{
      helpers.validObjectID(req.params.movieId)
    }catch(e){
      res.status(400).json({error: e});
      return;
    }
    try {
      const post = await movieData.removeMovie(req.params.movieId);
      res.json(post);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    try{
      helpers.validObjectID(req.params.movieId)
    }catch(e){
      res.status(400).json({error: e});
      return;
    }
    const data = req.body;
    const { title,
      plot,
      genres,
      rating,
      studio,
      director,
      castMembers,
      dateReleased,
      runtime
    } = data;
    try{
      helpers.createMovieValidation(
        title,
        plot,
        genres,
        rating,
        studio,
        director,
        castMembers,
        dateReleased,
        runtime);
    } catch(e) {
      res.status(400).json({error: e});
      return;
    }
      try {
        const post = await movieData.updateMovie(req.params.movieId, title,
          plot,
          genres,
          rating,
          studio,
          director,
          castMembers,
          dateReleased,
          runtime);
        res.status(200).json(post);
        return;
      } catch (e) {
        res.status(404).json({error: e});
      }
  });

module.exports = router;
