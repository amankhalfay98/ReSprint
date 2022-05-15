const { validate: uuidValidate } = require('uuid');
const uuid = require('uuid');
const verify = require('../middlewares/validation');
const mongoCollections = require('../config/mongoCollections');

const commentSchema = mongoCollections.comments;
const storiesSchema = mongoCollections.stories;

const getAllComments = async (projectId, storyId) => {
  if (projectId && !uuidValidate(projectId)) {
    throw TypeError('Project Id is of invalid type');
  }
  if (storyId && !uuidValidate(storyId)) {
    throw TypeError('Story Id is of invalid type');
  }
  const query = {};
  if (projectId) {
    query.projectId = projectId;
  }
  if (storyId) {
    query.storyId = storyId;
  }
  try {
    const commentsCollection = await commentSchema();
    let comments = await commentsCollection.find(query).toArray();
    if (comments !== null) {
      comments = comments.map((x) => {
        const val = x;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        val.id = val._id;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        delete val._id;
        return val;
      });
    }
    return comments;
  } catch (error) {
    throw Error(error.message);
  }
};

const getCommentById = async (id) => {
  if (!uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  try {
    const commentsCollection = await commentSchema();
    const comment = await commentsCollection.findOne({ _id: id });
    if (comment !== null) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      comment.id = comment._id;
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      delete comment._id;
    }
    return comment;
  } catch (error) {
    throw Error(error.message);
  }
};

const addComment = async (userId, name, comment, projectId, storyId) => {
  if (!verify.validString(userId)) {
    throw TypeError('User Id is of invalid type');
  }
  if (!uuidValidate(projectId)) {
    throw TypeError('Project Id is of invalid type');
  }
  if (!uuidValidate(storyId)) {
    throw TypeError('Story Id is of invalid type');
  }
  if (!name || !verify.validString(name)) {
    throw TypeError('Name is missing or is of invalid type');
  }
  if (!comment || !verify.validString(comment)) {
    throw TypeError('Comment is missing or is of invalid type');
  }
  const commentDocument = {
    _id: uuid.v4(),
    userId,
    name,
    comment,
    projectId,
    storyId,
  };
  const commentsCollection = await commentSchema();
  const addedComment = await commentsCollection.insertOne(commentDocument);
  const newId = addedComment.insertedId;
  if (addedComment !== null) {
    const storiesCollection = await storiesSchema();
    await storiesCollection.updateOne(
      {
        _id: storyId,
      },
      { $push: { comments: newId } }
    );
  }
  const addedCommentData = await getCommentById(newId);
  return addedCommentData;
};

const updateComment = async (id, comment, userId, name) => {
  if (id && !uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  if (userId && !verify.validString(userId)) {
    throw TypeError('User Id is of invalid type');
  }
  if (comment && !verify.validString(comment)) {
    throw TypeError('Comment is missing or is of invalid type');
  }
  if (name && !verify.validString(name)) {
    throw TypeError('Name is missing or is of invalid type');
  }
  const query = {};
  if (userId) {
    query.userId = userId;
  }
  if (comment) {
    query.comment = comment;
  }
  if (name) {
    query.name = name;
  }
  try {
    const commentsCollection = await commentSchema();
    await commentsCollection.updateOne({ _id: id }, { $set: query });
    const updatedComment = await getCommentById(id);
    return updatedComment;
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteComment = async (id, storyId) => {
  let comment;
  if (!uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  if (!uuidValidate(storyId)) {
    throw TypeError('Story Id is of invalid type');
  }
  try {
    const commentsCollection = await commentSchema();
    comment = await commentsCollection.deleteOne({ _id: id });
    const storiesCollection = await storiesSchema();
    await storiesCollection.updateOne(
      {
        _id: storyId,
      },
      { $pull: { comments: id } }
    );
    return comment;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  addComment,
  deleteComment,
  updateComment,
};
