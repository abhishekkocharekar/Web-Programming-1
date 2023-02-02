const postRoutes = require('./pokemon');

const constructorMethod = (app) => {
  app.use('/', postRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;
