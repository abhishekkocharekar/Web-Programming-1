const movie = require('./movies');
const helpers = require('../helpers');
const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {

  helpers.basicString(movieId);
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

  helpers.createReviewValidation(reviewTitle,
    reviewerName,
    review,
    rating
    );

    reviewTitle.trim();
    reviewerName.trim();
    review.trim();

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const reviewDate  = mm + '/' + dd + '/' + yyyy;
  

  const moviesCollection = await movies();
  const id = ObjectId();
  const setReview = {
    _id: id,
    reviewTitle: reviewTitle,
    reviewDate: reviewDate,
    reviewerName: reviewerName,
    review: review,
    rating: rating
  };

  const updatedMovie = {
    reviews: setReview
  };

  const updatedInfo = await moviesCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$addToSet: updatedMovie}
  );
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update movie name successfully';
  }

  let result = await movie.getMovieById(movieId);
  let overallRating = 0;
  result.reviews.forEach(element => {
    element["_id"] = element["_id"].toString();
    overallRating = overallRating + element.rating;
  });

  overallRating = overallRating / result.reviews.length;

  const updatedRating = {
    overallRating: overallRating
  };

  const updateRating = await moviesCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: updatedRating}
  );


  return result;
};

const getAllReviews = async (movieId) => {

    helpers.basicString(movieId);
    movieId = movieId.trim();
    if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

    const getMovie = await movie.getMovieById(movieId);
    if(getMovie.reviews.length < 1) throw `No Reviews for movie with that id`;
    getMovie.reviews.forEach(element => {
      element["_id"] = element["_id"].toString();
    });
    return getMovie.reviews;

};

const getReview = async (reviewId) => {

  helpers.basicString(reviewId);
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) throw 'invalid object ID';

  const moviesCollection = await movies();
  const movieList = await moviesCollection.find({}).toArray();
  if (!movieList) throw 'Could not get all the movies';

  let review = undefined;
  movieList.forEach(movieData => {
    movieData.reviews.forEach(reviewData => {
      if(reviewData._id.toString() === reviewId.toString()) {
        review = reviewData;
      }
    });
  });

  review._id = review._id.toString()
  return review;
};

const removeReview = async (reviewId) => {

  helpers.basicString(reviewId);
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) throw 'invalid object ID';


  const moviesCollection = await movies();
  const movieList = await moviesCollection.find({}).toArray();
  if (!movieList) throw 'Could not get all the movies';
    movieList.forEach(element => {
      element["_id"] = element["_id"].toString();
    });
  let updatedReview = undefined;
  let updatedMovie = undefined
  movieList.forEach(movieData => {
    for(let i = 0; i < movieData.reviews.length; i++) {

      if(movieData.reviews[i]._id.toString() === reviewId.toString()) {
        
        movieData.reviews.splice(i, 1);
        updatedMovie = movieData;
        updatedReview = movieData.reviews;

      }
    }
  });

  const updateMovie = {
    reviews: updatedReview
  };

  const updatedInfo = await moviesCollection.updateOne(
    {_id: ObjectId(updatedMovie._id)},
    {$set: updateMovie}
  );

  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update movie name successfully';
  }

  let result = await movie.getMovieById(updatedMovie._id);
  let overallRating = 0;
  result.reviews.forEach(element => {
    element["_id"] = element["_id"].toString();
    overallRating = overallRating + element.rating;
  });

  overallRating = overallRating / result.reviews.length;

  const updatedRating = {
    overallRating: overallRating
  };

  const updateRating = await moviesCollection.updateOne(
    {_id: ObjectId(updatedMovie._id)},
    {$set: updatedRating}
  );


  return result;
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
