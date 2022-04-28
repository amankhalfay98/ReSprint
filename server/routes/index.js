const projectRoutes = require('./projects');

const constructorMethod = (app) => {
  app.use('/projects', projectRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
