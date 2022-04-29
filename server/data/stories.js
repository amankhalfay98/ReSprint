const { validate: uuidValidate } = require('uuid');
const uuid = require('uuid');
const verify = require('../middlewares/validation');
const mongoCollections = require('../config/mongoCollections');
const { STATUS_VALUE, TYPE_VALUE } = require('../middlewares/constants');
const { query } = require('express');

const storiesSchema = mongoCollections.stories;

const validateParams = async (args) => {
  const {
    createdBy,
    assignedTo,
    comments,
    createdAt,
    description,
    modifiedAt,
    priority,
    sprint,
    status,
    storyPoint,
    title,
    type,
    id,
  } = args;
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

const getAllStories = async (
  assignedTo,
  createdAt,
  createdBy,
  modifiedAt,
  priority,
  sprint,
  status,
  storyPoint,
  type,
) => {
  //   const query = { members: { $in: [memberId] } };
  const query = {};
  const params = {
    assignedTo,
    createdAt,
    createdBy,
    modifiedAt,
    priority,
    sprint,
    status,
    storyPoint,
    type,
  };
  await validateParams(params);
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
    const story = await storiesCollection
      .find(query)
      .collation({ locale: 'en', strength: 2 })
      .toArray();
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
    return story;
  } catch (error) {
    throw Error(error.message);
  }
};

const upsertStory = async (
  createdBy,
  assignedTo,
  comments,
  createdAt,
  description,
  modifiedAt,
  priority,
  sprint,
  status,
  storyPoint,
  title,
  type,
  id = uuid.v4()
) => {
  const params = {
    createdBy,
    assignedTo,
    comments,
    createdAt,
    description,
    modifiedAt,
    priority,
    sprint,
    status,
    storyPoint,
    title,
    type,
    id,
  };
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
        $set: {
          assignedTo,
          comments,
          description,
          modifiedAt,
          priority,
          sprint,
          status,
          storyPoint,
          title,
          type,
        },
        $setOnInsert: {
          createdBy,
          createdAt,
        },
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
