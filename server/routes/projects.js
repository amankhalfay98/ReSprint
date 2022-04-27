const express = require('express');

const router = express.Router();
const { validate: uuidValidate } = require('uuid');
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
      message: `${errorParams} is not valid`,
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
      message: `${errorParams} is not valid`,
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

module.exports = router;
