const dbConnection = require('./mongoConnection');
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};
module.exports = {
  stories: getCollectionFn('Project_UserStories'),
  comments: getCollectionFn('Comments'),
  projects: getCollectionFn('Company_Projects'),
  users: getCollectionFn('Users'),
};
