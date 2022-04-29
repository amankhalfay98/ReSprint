const express = require('express');

const router = express.Router();
const { validate: uuidValidate } = require('uuid');
const verify = require('../middlewares/validation');
const storiesData = require('../data/stories');

router.get('/', async (req, res) => {
  let story;
  const {
    assignedTo,
    createdAt,
    createdBy,
    modifiedAt,
    priority,
    sprint,
    status,
    storyPoint,
    type,
  } = req.query;
  await storiesData.validateParams(req.query);
  try {
    story = await storiesData.getAllStories(
      assignedTo,
      createdAt,
      createdBy,
      modifiedAt,
      priority,
      sprint,
      status,
      storyPoint,
      type,
    );
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    story,
    status: 'success',
  });
});

router.put('/', async (req, res) => {
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
  } = req.body;
  let story;
  await storiesData.validateParams(req.body);
  try {
    story = await storiesData.upsertStory(
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
      id
    );
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    if (error instanceof ReferenceError) {
      return res.status(403).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  if (story.updatedExisting) {
    return res.status(200).json({
      story: story.story,
      status: 'success',
    });
  }
  return res.status(201).json({
    story: story.story,
    status: 'success',
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  let story;
  // const errorParams = [];
  if (!uuidValidate(id)) {
    res.status(422).json({
      status: 'error',
      message: 'Invalid Project Id type',
    });
  }
  // if (memberId && !uuidValidate(memberId)) {
  //   errorParams.push('memberId');
  // }
  // if (errorParams.length > 0) {
  //   return res.status(422).json({
  //     status: 'error',
  //     message: `${errorParams} is not valid type`,
  //   });
  // }
  try {
    story = await storiesData.getStoryById(id);
    if (story === null)
      return res.status(404).json({
        status: 'error',
        message: 'Story Not Found',
      });
    // if (!project.members.includes(memberId)) {
    //   return res.status(403).json({
    //     status: 'error',
    //     message: 'User Not Authorized',
    //   });
    // }
    await storiesData.deleteStory(id);
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
