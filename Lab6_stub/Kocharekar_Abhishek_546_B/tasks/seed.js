const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const movies = data.movies;
const reviews = data.reviews;

const main = async () => {
  const db = await dbConnection.dbConnection();
  await db.dropDatabase();
  let movie1 = undefined;
  let movie2 = undefined;
  let movie3 = undefined;
  let movie4 = undefined;
  let movie5 = undefined;

  console.log("Let's add movies!");

  try {
    movie1 = await movies.createMovie("Movie1", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Roadfa"], "PG-13", "United Artists", "Iaadf Soasdf", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/09/1990", "1h 45min");
    console.log(movie1);
  } catch (e) {
    console.log(e);
  }

  try {
    movie2 = await movies.createMovie("Movie2", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Roadfa"], "PG-13", "United Artists", "Iaadf Soasdf", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/09/1990", "1h 45min");
    console.log(movie2);
  } catch (e) {
    console.log(e);
  }

  try {
    movie3 = await movies.createMovie("Movie3", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Roadfa"], "PG-13", "United Artists", "Iaadf Soasdf", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/09/1990", "1h 45min");
    console.log(movie3);
  } catch (e) {
    console.log(e);
  }

  try {
    movie4 = await movies.createMovie("Movie4", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Roadfa"], "PG-13", "United Artists", "Iaadf Soasdf", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/09/1990", "1h 45min");
    console.log(movie4);
  } catch (e) {
    console.log(e);
  }

  try {
    movie5 = await movies.createMovie("Movie5", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Roadfa"], "PG-13", "United Artists", "Iaadf Soasdf", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/09/1990", "1h 45min");
    console.log(movie5);
  } catch (e) {
    console.log(e);
  }

  console.log("Let's modify movies!");

  try {
    movie5update = await movies.updateMovie(movie5._id, "Movie5 updated", "aaHackers are blamed for making a virus that will capsize five oil tankers.", ["aaCrime", "Drama", "Roadfa"], "aaPG-13", "aaUnited Artists", "aaIaadf Soasdf", ["aaJonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/09/1990", "1h 45min");
    console.log(movie5update);
  } catch (e) {
    console.log(e);
  }

  console.log("Let's add reviews!");

  try {
    review1 = await reviews.createReview(movie1._id, "movie1 review1", "Abhishek", "This movie was good.  It was entertaining, but as someone who works in IT, it was not very realistic", 2);
    console.log(review1);
  } catch (e) {
    console.log(e);
  }

  try {
    review2 = await reviews.createReview(movie1._id, "movie1 review2", "Abhishek", "This movie was good.  It was entertaining, but as someone who works in IT, it was not very realistic", 3);
    console.log(review2);
  } catch (e) {
    console.log(e);
  }

  try {
    review3 = await reviews.createReview(movie1._id, "movie1 review3", "Abhishek", "This movie was good.  It was entertaining, but as someone who works in IT, it was not very realistic", 4);
    console.log(review3);
  } catch (e) {
    console.log(e);
  }

  console.log("get all reviews!");

  try {
    movie1Reviews = await reviews.getAllReviews(movie1._id);
    console.log(movie1Reviews);
  } catch (e) {
    console.log(e);
  }

  console.log("get review by id!");

  try {
    getReviewbyId1 = await reviews.getReview(review1.reviews[0]._id);
    console.log(getReviewbyId1);
  } catch (e) {
    console.log(e);
  }

  try {
    getReviewbyId2 = await reviews.getReview("asdfasdf");
    console.log(getReviewbyId2);
  } catch (e) {
    console.log(e);
  }

  console.log("remove review!");

  try {
    getReviewbyId1 = await reviews.removeReview(review2.reviews[1]._id);
    console.log(getReviewbyId1);
  } catch (e) {
    console.log(e);
  }

  try {
    review4 = await reviews.createReview(movie1._id, "movie1 review4", "Abhishek", "This movie was good.  It was entertaining, but as someone who works in IT, it was not very realistic", 10);
    console.log(review4);
  } catch (e) {
    console.log(e);
  }

  console.log('Done seeding database');
  await dbConnection.closeConnection();
};

main().catch(console.log);
