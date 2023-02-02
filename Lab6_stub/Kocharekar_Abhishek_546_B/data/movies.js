const mongoCollections = require('../config/mongoCollections');
const helpers = require('../helpers');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const specialCharsWithNumbers = /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
const specialCharsWithoutNumbers = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
const specialCharsWithoutPunctuations = /[`!@#$%^&*()_+\-=\[\]{};:\\|<>\/?~]/g;

const getMovieById = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const moviesCollection = await movies();
  const movie = await moviesCollection.findOne({_id: ObjectId(id)});
  if (movie === null) throw 'No movie with that id';
  movie["_id"] = movie["_id"].toString();
  return movie;
};

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

  helpers.createMovieValidation(title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime);

  title.trim();
  plot.trim();
  rating.trim();
  studio.trim();
  director.trim();
  dateReleased.trim();
  runtime.trim();
    
  const moviesCollection = await movies();

    let newMovie = {
      title: title,
      plot: plot,
      genres: genres,
      rating: rating,
      studio: studio,
      director: director,
      castMembers: castMembers,
      dateReleased: dateReleased,
      runtime: runtime,
      reviews: [],
      overallRating: 0
    };

    const insertInfo = await moviesCollection.insertOne(newMovie);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add movie';

    const newId = insertInfo.insertedId.toString();
    const movie = await getMovieById(newId);
    return movie;
};

const getAllMovies = async () => {
    const moviesCollection = await movies();
    const movieList = await moviesCollection.find({}).toArray();
    if (!movieList) throw 'Could not get all the movies';
    let result = [];
    movieList.forEach(element => {
      element["_id"] = element["_id"].toString();
      let obj = {};
      obj._id = element._id;
      obj.title = element.title;
      result.push(obj);
    });
    return result;
};

const removeMovie = async (id) => {
    helpers.basicString(id);
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';

    const moviesCollection = await movies();

    const deletionInfo = await moviesCollection.deleteOne({_id: ObjectId(id)});

    if (deletionInfo.deletedCount === 0) throw `Could not delete movie with id of ${id}`;

    return {movieId: id, deleted: true};
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

  helpers.basicString(movieId);
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

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

  const moviesCollection = await movies();
  const updatedMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime
  };

  const updatedInfo = await moviesCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: updatedMovie}
  );
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update movie name successfully';
  }

  return await getMovieById(movieId);
};


module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie
};

