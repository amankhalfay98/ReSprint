const express = require('express');

const router = express.Router();
const { validate: uuidValidate } = require('uuid');
const verify = require('../middlewares/validation');
const commentData = require('../data/comments');
// const checkIfAuthenticated = require('../middlewares/auth');

router.get('/', async (req, res) => {
  const errorParams = [];
  let comments;
  const { projectId, storyId } = req.query;
  if (projectId && !uuidValidate(projectId)) {
    errorParams.push('Project Id');
  }
  if (storyId && !uuidValidate(storyId)) {
    errorParams.push('Story Id');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    comments = await commentData.getAllComments(projectId, storyId);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    comments,
    status: 'success',
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let comment;
  const errorParams = [];
  if (!uuidValidate(id)) {
    errorParams.push('Id');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    comment = await commentData.getCommentById(id);
    if (comment === null)
      return res.status(404).json({
        status: 'error',
        message: 'Comment Not Found',
      });
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    comment,
    status: 'success',
  });
});

router.post('/', async (req, res) => {
  const { userId, name, comment, projectId, storyId } = req.body;
  let newComment;
  const errorParams = [];
  // if (!uuidValidate(userId)) {
  //   errorParams.push('User Id');
  // }
  if (!verify.validString(name)) {
    errorParams.push('Name');
  }
  if (!verify.validString(comment)) {
    errorParams.push('Comment');
  }
  if (!uuidValidate(projectId)) {
    errorParams.push('Project Id');
  }
  if (!uuidValidate(storyId)) {
    errorParams.push('Story Id');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    newComment = await commentData.addComment(userId, name, comment, projectId, storyId);
    if (newComment === null)
      return res.status(404).json({
        status: 'error',
        message: 'Comment Not Found',
      });
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(201).json({
    comment: newComment,
    status: 'success',
  });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { comment, userId, name } = req.body;
  let updatedcomment;
  const errorParams = [];
  if (id && !uuidValidate(id)) {
    errorParams.push('Id');
  }
  if (userId && !uuidValidate(userId)) {
    errorParams.push('User Id');
  }
  if (comment && !verify.validString(comment)) {
    errorParams.push('Comment');
  }
  if (name && !verify.validString(name)) {
    errorParams.push('Name');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    updatedcomment = await commentData.updateComment(id, comment, userId, name);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    comment: updatedcomment,
    status: 'success',
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const errorParams = [];
  if (!uuidValidate(id)) {
    res.status(422).json({
      status: 'error',
      message: 'Comment Id is of invalid type',
    });
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    const comment = await commentData.getCommentById(id);
    if (comment === null)
      return res.status(404).json({
        status: 'error',
        message: 'Project Not Found',
      });
    await commentData.deleteComment(id, comment.storyId);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    status: 'success',
  });
});

module.exports = router;
