const { validate: uuidValidate } = require('uuid');
require('dotenv').config();

const redis = require('redis');
const bluebird = require('bluebird');
const mongoCollections = require('../config/mongoCollections');
const verify = require('../middlewares/validation');

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || '6379',
  auth_pass: process.env.REDIS_PASS || '',
};
const client = redis.createClient(redisConfig);

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis Connection Successful!!');
});

client.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log(`${error}`);
});

const projectSchema = mongoCollections.projects;

const getUserById = async (id) => {
  try {
    // const usersCollection = await userSchema();
    // const user = await usersCollection.findOne({ _id: id });
    const user = JSON.parse(await client.getAsync(id));
    // if (user !== null) {
    //   /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    //   user.id = user._id;
    //   /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    //   delete user._id;
    // }
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

const createUser = async (userId, email, isScrumMaster, userName, projects, company, fileName) => {
  let photoURL = null;
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
  if (!uuidValidate(company)) {
    throw TypeError('Company is missing or is of invalid type');
  }
  if (fileName == 'undefined') {
    photoURL = 'https://resprint-media.s3.amazonaws.com/man.png';
  } else {
    photoURL = `https://resprint-media.s3.amazonaws.com/${fileName}`;
  }
  if (projects.length > 0) {
    for (let index = 0; index < projects.length; index += 1) {
      if (!uuidValidate(projects[index])) {
        throw TypeError('Project Id is of invalid type');
      }
    }
  }
  const userDocument = {
    id: userId,
    email,
    isScrumMaster,
    userName,
    projects,
    company,
    photoURL,
  };
  // const usersCollection = await userSchema();
  // const user = await usersCollection.insertOne(userDocument);
  const user = await client.setAsync(userId, JSON.stringify(userDocument));
  await client.lpushAsync('users', JSON.stringify(userDocument));
  if (user !== null) {
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
  const createdUserData = await getUserById(userId);
  return createdUserData;
};

const getUser = async (company, projectId) => {
  // const query = {};
  if (company && !uuidValidate(company)) {
    throw TypeError('Company id is of invalid type');
  }
  if (projectId && !uuidValidate(projectId)) {
    throw TypeError('Project id is of invalid type');
  }
  // if (company) query.company = company;
  // const usersCollection = await userSchema();
  // return usersCollection.findOne(query);
  if (projectId !== undefined) {
    const users = await client
      .lrangeAsync('users', 0, -1)
      .map(JSON.parse)
      .filter((value) => {
        if (projectId && value && value.projects.length > 0) {
          if (value.projects.includes(projectId)) return value;
        }
      });
    return users;
  }
  const users = await client
    .lrangeAsync('users', 0, -1)
    .map(JSON.parse)
    .filter((value) => {
      if (company) {
        return value.company === company;
      }
      return value;
    });
  return users;
};

const updateUser = async (id, email, isScrumMaster, userName, projects, company) => {
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
  if (!uuidValidate(company)) {
    throw TypeError('Company is missing or is of invalid type');
  }
  if (projects.length > 0) {
    for (let index = 0; index < projects.length; index += 1) {
      if (!uuidValidate(projects[index])) {
        throw TypeError('Project Id is of invalid type');
      }
    }
  }
  const updateUserDocument = {
    id,
    email,
    isScrumMaster,
    userName,
    projects,
    company,
  };
  // const usersCollection = await userSchema();
  // await usersCollection.updateOne({ _id: id }, { $set: { email, isScrumMaster, userName, projects, company } });
  try {
    const cache = JSON.parse(await client.getAsync(id));
    await client.lremAsync('users', 0, JSON.stringify(cache));
    await client.lpushAsync('users', 0, JSON.stringify(updateUserDocument));
    await client.setAsync(id, JSON.stringify(updateUserDocument));
  } catch (error) {
    throw Error(error.message);
  }
  return getUserById(id);
};

module.exports = {
  getUserById,
  createUser,
  getUser,
  updateUser,
};
