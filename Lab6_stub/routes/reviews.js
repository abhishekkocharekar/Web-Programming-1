//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const helpers = require('../helpers');

router
  .route('/:movieId')
  .get(async (req, res) => {
    try{
      helpers.validObjectID(req.params.movieId)
    }catch(e){
      res.status(400).json({error: e});
      return;
    }
    try {
      const post = await reviewData.getAllReviews(req.params.movieId);
      res.json(post);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    try{
      helpers.validObjectID(req.params.movieId)
    }catch(e){
      res.status(400).json({error: e});
      return;
    }
    const data = req.body;
    const {
      reviewTitle,
      reviewerName,
      review,
      rating} = data;
      try{
        helpers.createReviewValidation(reviewTitle,
          reviewerName,
          review,
          rating
          );
      } catch(e) {
        res.status(400).json({error: e});
        return;
      }
      try {
        const post = await reviewData.createReview(req.params.movieId,
          reviewTitle,
          reviewerName,
          review,
          rating);
        res.status(200).json(post);
        return;
      } catch (e) {
        res.status(404).json({error: e});
      }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    try{
      helpers.validObjectID(req.params.reviewId)
    }catch(e){
      res.status(400).json({error: e});
      return;
    }
    try {
      const post = await reviewData.getReview(req.params.reviewId);
      res.json(post);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    try{
      helpers.validObjectID(req.params.reviewId)
    }catch(e){
      res.status(400).json({error: e});
      return;
    }
    try {
      const post = await reviewData.removeReview(req.params.reviewId);
      res.json(post);
    } catch (e) {
      res.status(404).json({error: e});
    }
  });

module.exports = router;