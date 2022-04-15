const constructorMethod = (app) => {
  app.use('*', (req, res) => {
    res.sendStatus(200);
  });
};

module.exports = constructorMethod;
