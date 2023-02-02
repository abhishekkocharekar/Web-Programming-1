const mongoCollections = require('../config/mongoCollections');
const helpers = require('../helpers');
const users = mongoCollections.user_collection;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const createUser = async (
  username, password
) => { 

    helpers.validUsername(username);
    helpers.validPassword(password);

    username.trim();
    password.trim();

    username = username.toLowerCase();

    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    if (!userList) throw 'Could not get all the users';

    const user = userList.find(element => {
      if(element["username"] === username) {
        return element;
      }
    });

    if(user) throw `Username already exists`;

    const hash = await bcrypt.hash(password, saltRounds);

    let newUser = {
      username: username,
      password: hash
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add movie';

    return {insertedUser: true}

};

const compare = async(password,hash) => {
  return await bcrypt.compare(password, hash);
}

const checkUser = async (username, password) => { 

  helpers.validUsername(username);
  helpers.validPassword(password);

  username.trim();
  password.trim();

  username = username.toLowerCase();

  const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    if (!userList) throw 'Could not get all the users';
    let result = {authenticatedUser: false}
    const user = userList.find(element => {
      if(element["username"] === username) {
        return element;
      }
    });
    if(user){
      compareToSherlock = await compare(password,user.password);
      if(compareToSherlock){
        result.authenticatedUser =  true;
      } else {
        throw `Either the username or password is invalid`
      }
    } else {
      throw `Either the username or password is invalid`
    }
    return result;
};

module.exports = {
  createUser,
  checkUser
};
