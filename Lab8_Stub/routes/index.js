//Here you will require route files and export them as used in previous labs
const postRoutes = require('./people');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/', postRoutes);
};

module.exports = constructorMethod;
