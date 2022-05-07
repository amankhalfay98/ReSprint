const express = require('express');

const router = express.Router();
const { validate: uuidValidate } = require('uuid');
const storiesData = require('../data/stories');

router.get('/', async (req, res) => {
  let stories;
  const { projectId, assignedTo, createdAt, createdBy, modifiedAt, priority, sprint, status, storyPoint, type } = req.query;
  await storiesData.validateParams(req.query);
  try {
    stories = await storiesData.getAllStories(projectId, assignedTo, createdAt, createdBy, modifiedAt, priority, sprint, status, storyPoint, type);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    stories,
    status: 'success',
  });
});

router.get('/:id', async (req, res) => {
  let story;
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return res.status(422).json({
      status: 'error',
      message: 'Id is of invalid type',
    });
  }
  try {
    story = await storiesData.getStoryById(id);
    if (story === null)
      return res.status(404).json({
        status: 'error',
        message: 'Story Not Found',
      });
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
  const { projectId, createdBy, assignedTo, comments, createdAt, description, modifiedAt, priority, sprint, status, storyPoint, title, type, id } = req.body;
  let story;
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
  if (errorParams.length > 0)
    return res.status(400).json({
      status: 'error',
      message: errorParams.length > 1 ? `${errorParams} are missing` : `${errorParams} is missing`,
    });
  await storiesData.validateParams(req.body);
  try {
    story = await storiesData.upsertStory(projectId, createdBy, assignedTo, comments, createdAt, description, modifiedAt, priority, sprint, status, storyPoint, title, type, id);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    if (error instanceof ReferenceError) {
      return res.status(403).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  if (story.missing) {
    return res.status(400).json({
      status: 'error',
      message: story.errorParams.length > 1 ? `${story.errorParams} are missing` : `${story.errorParams} is missing`,
    });
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
      message: 'Story id of invalid type',
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
    await storiesData.deleteStory(id, story.projectId);
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
