const projectRoutes = require('./projects');
const storyRoutes = require('./stories');
const commentRoutes = require('./comments');
const userRoutes = require('./users');
const companyRoutes = require('./company');

const constructorMethod = (app) => {
  app.use('/projects', projectRoutes);
  app.use('/story', storyRoutes);
  app.use('/comment', commentRoutes);
  app.use('/company', companyRoutes);
  app.use('/', userRoutes);
  
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
