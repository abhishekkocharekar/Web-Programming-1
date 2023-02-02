/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

const movies = require('./data/movies');
const connection = require('./config/mongoConnection');

const main = async () => {
  const db = await connection.dbConnection();
  await db.dropDatabase();
  let movie1 = undefined;
  let movie2 = undefined;
  let movie3 = undefined;

  console.log("Let's add movie1!");

  try {
    movie1 = await movies.createMovie("Movie1", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Roadfa"], "PG-13", "United Artists", "Iaadf Soasdf", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/09/1990", "1h 45min");
    console.log(movie1);
  } catch (e) {
    console.log(e);
  }

  try {
    console.log(await movies.getMovieById(movie1._id.toString()));
  } catch (e) {
    console.log(e);
  }

  console.log("Let's add movie2!");

  try {
    movie2 = await movies.createMovie("Movie2", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Roadfa"], "PG-13", "United Artists", "Iaadf Soasdf", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    console.log(movie2);
  } catch (e) {
    console.log(e);
  }

  console.log('Lets now get all movies from the DB');

  try {
    const movieList = await movies.getAllMovies();
    console.log(movieList);
  } catch (e) {
    console.log(e);
  }

  console.log("Let's add movie3!");

  try {
    movie3 = await movies.createMovie("Movie3", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Roadfa"], "PG-13", "United Artists", "Iaadf Soasdf", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    console.log(movie3);
  } catch (e) {
    console.log(e);
  }

  try {
    console.log(await movies.getMovieById(movie3._id.toString()));
  } catch (e) {
    console.log(e);
  }

  console.log("Let's change the title of movie1");

  try {
    const updatedMovie = await movies.renameMovie(
        movie1._id.toString(),
      "New Movie 1"
    );
    console.log('Now, the movie is:');
    console.log(updatedMovie);
  } catch (e) {
    console.log(e);
  }

  console.log("Now let's remove Movie2");

  try {
    let deleted = await movies.removeMovie(movie2._id.toString());
    console.log(deleted);
  } catch (e) {
    console.log(e);
  }

  console.log('Lets now get all movies from the DB');

  try {
    const movieList = await movies.getAllMovies();
    console.log(movieList);
  } catch (e) {
    console.log(e);
  }

  console.log("Now let's try to remove Movie2 again");

  try {
    let deleted = await movies.removeMovie(movie2._id.toString());
    console.log(deleted);
  } catch (e) {
    console.log(e);
  }

  console.log("Now let's try to RENAME Movie2 again");

  try {
    const updatedMovie = await movies.renameMovie(
        movie2._id.toString(),
      "New Movie 2"
    );
    console.log('Now, the movie is:');
    console.log(updatedMovie);
  } catch (e) {
    console.log(e);
  }

  console.log("Now let's try to rename Movie3 with wrong input");

  try {
    const updatedMovie = await movies.renameMovie(
        movie3._id.toString(),
      "New Movie 2#$%"
    );
    console.log('Now, the movie is:');
    console.log(updatedMovie);
  } catch (e) {
    console.log(e);
  }

  console.log("Now let's try get movie by id with wrong input");

  try {
    console.log(await movies.getMovieById(movie2._id.toString()));
  } catch (e) {
    console.log(e);
  }

await connection.closeConnection();

};

main();

