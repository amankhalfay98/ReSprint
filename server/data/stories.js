const { validate: uuidValidate } = require('uuid');
const uuid = require('uuid');
const verify = require('../middlewares/validation');
const mongoCollections = require('../config/mongoCollections');
const { STATUS_VALUE, TYPE_VALUE } = require('../middlewares/constants');

const storiesSchema = mongoCollections.stories;

const validateParams = async (args) => {
  const { projectId, createdBy, assignedTo, comments, createdAt, description, modifiedAt, priority, sprint, status, storyPoint, title, type, id } = args;
  if (projectId && !uuidValidate(projectId)) {
    throw TypeError('Project Id is of invalid type');
  }
  if (createdBy && !uuidValidate(createdBy)) {
    throw TypeError('Created by is of invalid type');
  }
  if (assignedTo && !uuidValidate(assignedTo)) {
    throw TypeError('Assigned to is of invalid type');
  }
  if (comments && !Array.isArray(comments)) {
    throw TypeError('Members is of invalid type');
  }
  if (createdAt && !verify.validIsoDate(createdAt)) {
    throw TypeError('Created At is of invalid type');
  }
  if (description && !verify.validString(description)) {
    throw TypeError('Description is of invalid type');
  }
  if (modifiedAt && !verify.validIsoDate(modifiedAt)) {
    throw TypeError('Modified At is of invalid type');
  }
  if (priority && !verify.checkIsProperNumber(priority)) {
    throw TypeError('Priority is of invalid type');
  }
  if (sprint && !verify.checkIsProperNumber(sprint)) {
    throw TypeError('Sprint is of invalid type');
  }
  if (status && !STATUS_VALUE.includes(status)) {
    throw TypeError('Status is of invalid type');
  }
  if (storyPoint && !verify.checkIsProperNumber(storyPoint)) {
    throw TypeError('Story Point is of invalid type');
  }
  if (title && !verify.validString(title)) {
    throw TypeError('Title is of invalid type');
  }
  if (type && !TYPE_VALUE.includes(type)) {
    throw TypeError('Type is of invalid type');
  }
  if (id && !uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
};

const getAllStories = async (projectId, assignedTo, createdAt, createdBy, modifiedAt, priority, sprint, status, storyPoint, type) => {
  const query = {};
  const params = { projectId, assignedTo, createdAt, createdBy, modifiedAt, priority, sprint, status, storyPoint, type };
  await validateParams(params);
  if (projectId) {
    query.projectId = projectId;
  }
  if (assignedTo) {
    query.assignedTo = assignedTo;
  }
  if (createdAt) {
    query.createdAt = createdAt;
  }
  if (createdBy) {
    query.createdBy = createdBy;
  }
  if (modifiedAt) {
    query.modifiedAt = modifiedAt;
  }
  if (priority) {
    query.priority = priority;
  }
  if (priority) {
    query.sprint = sprint;
  }
  if (status) {
    query.status = status;
  }
  if (storyPoint) {
    query.storyPoint = storyPoint;
  }
  if (type) {
    query.type = type;
  }
  try {
    const storiesCollection = await storiesSchema();
    let story = await storiesCollection.find(query).collation({ locale: 'en', strength: 2 }).toArray();
    if (story !== null) {
      story = story.map((x) => {
        const val = x;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        val.id = val._id;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        delete val._id;
        return val;
      });
    }
    return story;
  } catch (error) {
    throw Error(error.message);
  }
};

const getStoryById = async (id) => {
  if (!uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  try {
    const storiesCollection = await storiesSchema();
    const story = await storiesCollection.findOne({ _id: id });
    if (story !== null) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      story.id = story._id;
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      delete story._id;
    }
    return story;
  } catch (error) {
    throw Error(error.message);
  }
};

const upsertStory = async (projectId, createdBy, assignedTo, comments, createdAt, description, modifiedAt, priority, sprint, status, storyPoint, title, type, id = uuid.v4()) => {
  const params = { createdBy, assignedTo, comments, createdAt, description, modifiedAt, priority, sprint, status, storyPoint, title, type, id };
  const errorParams = [];
  if (!projectId) errorParams.push('Project Id');
  if (!createdBy) errorParams.push('Created By');
  if (!assignedTo) errorParams.push('Assigned To');
  if (!comments) errorParams.push('Comments');
  if (!createdAt) errorParams.push('Created At');
  if (!description) errorParams.push('Description');
  if (!modifiedAt) errorParams.push('Modified By');
  if (!priority) errorParams.push('Priority');
  if (!sprint) errorParams.push('Sprint');
  if (!status) errorParams.push('Status');
  if (!storyPoint) errorParams.push('Story Point');
  if (!title) errorParams.push('Title');
  if (!type) errorParams.push('Type');
  if (!id) errorParams.push('Id');
  if (errorParams.length > 0) return { errorParams, missing: true };
  await validateParams(params);
  try {
    const storiesCollection = await storiesSchema();
    let story = await storiesCollection.findOneAndUpdate(
      {
        $and: [
          {
            $or: [{ createdBy }, { assignedTo }],
          },
          {
            _id: id,
          },
        ],
      },
      {
        $set: { assignedTo, comments, description, modifiedAt, priority, sprint, status, storyPoint, title, type },
        $setOnInsert: { createdBy, createdAt, projectId },
      },
      {
        upsert: true,
      }
    );
    const { updatedExisting } = story.lastErrorObject;
    if (story !== null) {
      story = await storiesCollection.findOne({
        _id: id,
      });
      if (story !== null) {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        story.id = story._id;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        delete story._id;
      }
    }
    return { updatedExisting, story };
  } catch (error) {
    if (error.code === 11000) {
      throw ReferenceError('User Not Authorized');
    }
    throw Error(error.message);
  }
};

const deleteStory = async (id) => {
  let story;
  if (!uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  try {
    const storiesCollection = await storiesSchema();
    story = await storiesCollection.deleteOne({ _id: id });
    return story;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getAllStories,
  getStoryById,
  validateParams,
  upsertStory,
  deleteStory,
};
