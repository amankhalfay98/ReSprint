const { validate: uuidValidate } = require('uuid');
const verify = require('../middlewares/validation');
const mongoCollections = require('../config/mongoCollections');

const userSchema = mongoCollections.users;
const projectSchema = mongoCollections.projects;

const getUserById = async (id) => {
  try {
    const usersCollection = await userSchema();
    const user = await usersCollection.findOne({ _id: id });
    if (user !== null) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      user.id = user._id;
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      delete user._id;
    }
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

const createUser = async (userId, email, isScrumMaster, userName, projects) => {
  if (!verify.validString(userName)) {
    throw TypeError('Username is missing or is of invalid type');
  }
  if (!verify.validEmail(email)) {
    throw TypeError('Email is missing or is of invalid type');
  }
  if (!verify.validBoolean(isScrumMaster)) {
    throw TypeError('isScrumMaster is missing or is of invalid type');
  }
  if (!Array.isArray(projects)) {
    throw TypeError('Projects is missing is missing or is of invalid type');
  }
  if (projects.length > 0) {
    for (let index = 0; index < projects.length; index += 1) {
      if (!uuidValidate(projects[index])) {
        throw TypeError('projectId is of invalid type');
      }
    }
  }
  const userDocument = {
    _id: userId,
    email,
    isScrumMaster,
    userName,
    projects,
  };
  const usersCollection = await userSchema();
  const user = await usersCollection.insertOne(userDocument);
  if (user.insertedCount > 0) {
    const projectsCollection = await projectSchema();
    for (let index = 0; index < projects.length; index += 1) {
      // eslint-disable-next-line
      await projectsCollection.updateOne({ _id: projects[index] }, { $push: { members: userId } });
      if (isScrumMaster) {
        // eslint-disable-next-line
        await projectsCollection.updateOne({ _id: projects[index] }, { $set: { master: userId } });
      }
    }
  }
  const newId = user.insertedId;
  const createdUserData = await getUserById(newId);
  return createdUserData;
};

module.exports = {
  getUserById,
  createUser,
};
