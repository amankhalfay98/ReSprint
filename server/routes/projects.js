const express = require('express');

const router = express.Router();
const { validate: uuidValidate } = require('uuid');
const verify = require('../middlewares/validation');
const projectData = require('../data/projects');
const userData = require('../data/users');
// const checkIfAuthenticated = require('../middlewares/auth');

const paramsValidation = (params) => {
  const errorParams = [];
  const { id, members, master, projectName, userStories, totalSprints, company, memberId } = params;
  if (!Array.isArray(members)) {
    errorParams.push('Members');
  }
  if (!verify.validString(master)) {
    errorParams.push('Master');
  }
  if (!verify.validString(memberId)) {
    errorParams.push('Member Id');
  }
  if (id && !uuidValidate(id)) {
    errorParams.push('id');
  }
  if (!verify.validString(projectName)) {
    errorParams.push('Project Name');
  }
  if (!uuidValidate(company)) {
    errorParams.push('Company');
  }
  if (!Array.isArray(userStories)) {
    errorParams.push('User Stories');
  }
  if (!verify.checkIsProperNumber(totalSprints)) {
    errorParams.push('Total Sprints');
  }
  for (let index = 0; index < members.length; index += 1) {
    if (!verify.validString(members[index])) {
      errorParams.push(`Member ${members[index]}`);
      break;
    }
  }
  for (let index = 0; index < userStories.length; index += 1) {
    if (!uuidValidate(userStories[index])) {
      errorParams.push(`User Stories`);
      break;
    }
  }
  return errorParams;
};

router.get('/', async (req, res) => {
  const errorParams = [];
  let projects;
  // const { memberId } = req.body;
  const { company, projectName } = req.query;
  // if (memberId && !uuidValidate(memberId)) {
  //   errorParams.push('memberId');
  // }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    projects = await projectData.getAllProjects(company, projectName);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    projects,
    status: 'success',
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // const { memberId } = req.body;
  let project;
  const errorParams = [];
  if (!uuidValidate(id)) {
    errorParams.push('Id');
  }
  // if (memberId && !uuidValidate(memberId)) {
  //   errorParams.push('memberId');
  // }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    project = await projectData.getProjectById(id);
    if (project === null)
      return res.status(404).json({
        status: 'error',
        message: 'Project Not Found',
      });
    // if (!project.members.includes(memberId)) {
    //   return res.status(403).json({
    //     status: 'error',
    //     message: 'User Not Authorized',
    //   });
    // }
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    project,
    status: 'success',
  });
});

router.put('/', async (req, res) => {
  const { id, members, master, projectName, userStories, totalSprints, company, memberId } = req.body;
  let project;
  const errorParams = paramsValidation(req.body);
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    project = await projectData.upsertProject(members, master, projectName, userStories, totalSprints, company, memberId, id);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    if (error instanceof ReferenceError) {
      return res.status(403).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  if (project.updatedExisting) {
    return res.status(200).json({
      project: project.project,
      status: 'success',
    });
  }
  return res.status(201).json({
    project: project.project,
    status: 'success',
  });
});

router.delete('/:id/:userId', async (req, res) => {
  const { id, userId } = req. params;
  let project;
  const errorParams = [];
  if (!uuidValidate(id)) {
    errorParams.push('Id');
  }
  if (userId && !verify.validString(userId)) {
    errorParams.push('User Id');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    project = await projectData.getProjectById(id);
    if (project === null)
      return res.status(404).json({
        status: 'error',
        message: 'Project Not Found',
      });
    const userDetails = await userData.getUserById(userId);
    if (userDetails.status === 'success' && userDetails.isScrumMaster) {
      return res.status(403).json({
        status: 'error',
        message: 'User Not Authorized',
      });
    }
    await projectData.deleteProject(id);
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
