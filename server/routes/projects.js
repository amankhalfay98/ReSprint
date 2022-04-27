const express = require('express');

const router = express.Router();
const { validate: uuidValidate } = require('uuid');
const verify = require('../middlewares/validation');
const projectData = require('../data/projects');

router.get('/', async (req, res) => {
  const errorParams = [];
  let projects;
  const { memberId } = req.body;
  if (memberId && !uuidValidate(memberId)) {
    errorParams.push('memberId');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is not valid type`,
    });
  }
  try {
    projects = await projectData.getAllProjects(memberId);
    if (projects.error) {
      return res.status(422).json({
        status: 'error',
        message: projects.message,
      });
    }
  } catch (error) {
    res.status().json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    projects,
    status: 'success',
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let project;
  const errorParams = [];
  if (!uuidValidate(id)) {
    res.status(422).json({
      status: 'error',
      message: 'Invalid Project Id type',
    });
  }
  const { memberId } = req.body;
  if (memberId && !uuidValidate(memberId)) {
    errorParams.push('memberId');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is not valid type`,
    });
  }
  try {
    project = await projectData.getProjectById(id, memberId);
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    project,
    status: 'success',
  });
});

router.post('/', async (req, res) => {
  const { members, master, projectName, userStories, totalSprints } = req.body;
  let project;
  const errorParams = [];
  if (!Array.isArray(members)) {
    errorParams.push('Members');
  }
  if (!uuidValidate(master)) {
    errorParams.push('Master');
  }
  if (!verify.validString(projectName)) {
    errorParams.push('Project Name');
  }
  if (!Array.isArray(userStories)) {
    errorParams.push('User Stories');
  }
  if (!verify.checkIsProperNumber(totalSprints)) {
    errorParams.push('Total Sprints');
  }
  for (let index = 0; index < members.length; index += 1) {
    if (!uuidValidate(members[index])) {
      errorParams.push(`Member`);
      break;
    }
  }
  for (let index = 0; index < userStories.length; index += 1) {
    if (!uuidValidate(userStories[index])) {
      errorParams.push(`User Stories`);
      break;
    }
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is not valid type`,
    });
  }
  try {
    project = await projectData.addProject(members, master, projectName, userStories, totalSprints);
  } catch (error) {
    return res.json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    project,
    status: 'success',
  });
});

module.exports = router;
