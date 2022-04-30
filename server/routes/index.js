const projectRoutes = require('./projects');
const storyRoutes = require('./stories');

const constructorMethod = (app) => {
  app.use('/projects', projectRoutes);
  app.use('/story', storyRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
