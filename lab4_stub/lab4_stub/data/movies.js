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

  helpers.basicString(title);
  helpers.basicString(plot);
  helpers.isArray(genres);
  helpers.basicString(rating);
  helpers.basicString(studio);
  helpers.basicString(director);
  helpers.isArray(castMembers);
  helpers.basicString(dateReleased);
  helpers.basicString(runtime);

  title.trim();
  plot.trim();
  rating.trim();
  studio.trim();
  director.trim();
  dateReleased.trim();
  runtime.trim();

  if(title.match(specialCharsWithoutNumbers) || title.length < 2) throw `Invalid Title`;

  if(studio.match(specialCharsWithoutPunctuations) || studio.length < 5) throw `Invalid Title`;

  helpers.validName(director);

  if(rating !== "G" && rating !== "PG" && rating !== "PG-13" && rating !== "R" && rating !== "NC-17") throw `Invalid rating`;

  for(i=0; i<genres.length; i++){
    helpers.basicString(genres[i]);
    genres[i] = genres[i].trim();
    if(genres[i].match(specialCharsWithNumbers) || genres[i].length < 5) throw `Invalid Genre`;
  }

  for(i=0; i<castMembers.length; i++){
    helpers.basicString(castMembers[i]);
    castMembers[i] = castMembers[i].trim();
    helpers.validName(castMembers[i]);
  }

  const date = new Date();
  if(dateReleased.slice(2,3) !== "/" || dateReleased.slice(5,6) !== "/") throw `Date must be in the mm/dd/yyyy format`;

  let month = Number(dateReleased.slice(0,2));
  let day = Number(dateReleased.slice(3,5));
  let year = Number(dateReleased.slice(6));

  if(Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(year)) throw `day, month and year must be numbers`;
  if(year > Number(date.toLocaleDateString().slice(-4)) + 2) throw `Relese date must be withing 2 years of the current date`;
  if(year < 1900) throw `Relese date can not be lower than 1990`;
  if(month < 1 || month > 12) throw `Month must be between 1-12`;
  if(day < 1 || day > 31) throw `Day must be between 1-31`;
  if(month=== 2 && day > 28) throw `February can not contain more than 28 days`;
  if(month === 4 || month === 6 || month === 9 || month === 11){
    if(day > 30) throw `Date can not be 31 for the month ${day}`;
  }

  let temp = runtime.split(" ");
  if(temp.length > 2) throw `The runtime must be in "#h #min" format`;

  if(temp[0].slice(-1) !== "h" || temp[1].slice(-3) !== "min") throw `The runtime must be in "#h #min" format`;

  if(temp[0].match(specialCharsWithoutNumbers) || temp[1].match(specialCharsWithoutNumbers)) throw `The runtime can not contain special characters`;

  temp[0] = Number(temp[0].replace("h",""));
  temp[1] = Number(temp[1].replace("min",""));

  if (typeof (temp[0]) != "number" || Number.isNaN(temp[0])) throw `The runtime must be in "#h #min" format`;
  if (typeof (temp[1]) != "number" || Number.isNaN(temp[1])) throw `The runtime must be in "#h #min" format`;

  if(temp[0] < 1) throw `The length of the movie should be atleast 1 hour`;
  if(temp[1] > 59 || temp[1] < 0) throw `The value of mins should be 0-59`;
    
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
      runtime: runtime
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
    movieList.forEach(element => {
      element["_id"] = element["_id"].toString();
    });
    return movieList;
};

const removeMovie = async (id) => {
    helpers.basicString(id);
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';

    const moviesCollection = await movies();

    const movie = await getMovieById(id);

    const deletionInfo = await moviesCollection.deleteOne({_id: ObjectId(id)});

    if (deletionInfo.deletedCount === 0) throw `Could not delete movie with id of ${id}`;

    return `${movie.title} has been successfully deleted!`;
};

const renameMovie = async (id, newName) => {
    helpers.basicString(id);
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    helpers.basicString(newName);
    newName = newName.trim();
    if(newName.match(specialCharsWithoutNumbers) || newName.length < 2) throw `Invalid Title`;

    const moviesCollection = await movies();
    const updatedMovie = {
      title: newName
    };
  
    const updatedInfo = await moviesCollection.updateOne(
      {_id: ObjectId(id)},
      {$set: updatedMovie}
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update movie name successfully';
    }
  
    return await getMovieById(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie
};
