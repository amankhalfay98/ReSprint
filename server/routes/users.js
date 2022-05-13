const express = require('express');

const router = express.Router();
const { validate: uuidValidate } = require('uuid');
const verify = require('../middlewares/validation');
const userData = require('../data/users');
const projectsData = require('../data/projects');
const companyData = require('../data/company');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let user;
  try {
    user = await userData.getUserById(id);
    if (user === null)
      return res.status(404).json({
        status: 'error',
        message: 'User Not Found',
      });
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    user,
    status: 'success',
  });
});

router.post('/', async (req, res) => {
  const { userId, email, isScrumMaster, userName, projects, company } = req.body;
  let newUser;
  const errorParams = [];
  if (!verify.validEmail(email)) {
    errorParams.push('Email');
  }
  if (!verify.validBoolean(isScrumMaster)) {
    errorParams.push('isScrumMaster');
  }
  if (!verify.validString(userName)) {
    errorParams.push('Username');
  }
  if (!Array.isArray(projects)) {
    errorParams.push('Projects');
  }
  if (!uuidValidate(company)) {
    errorParams.push('Company');
  }
  if (projects.length > 0) {
    for (let index = 0; index < projects.length; index += 1) {
      if (!uuidValidate(projects[index])) {
        errorParams.push(`Project Id ${projects[index]}`);
      }
      // eslint-disable-next-line
      if ((await projectsData.getProjectById(projects[index])) === null) {
        return res.status(404).json({
          status: 'error',
          message: 'Project Not Found',
        });
      }
    }
    if ((await companyData.getCompanyById(company)) === null) {
      return res.status(404).json({ status: 'error', message: 'Company Not Found' });
    }
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    newUser = await userData.getUserById(userId);
    if (newUser !== null) {
      return res.status(200).json({ user: newUser, status: 'success' });
    }
    newUser = await userData.createUser(userId, email, isScrumMaster, userName, projects, company);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(201).json({
    user: newUser,
    status: 'success',
  });
});

router.get('/', async (req, res) => {
  const { company } = req.query;
  let user;
  try {
    user = await userData.getUser(company);
    if (user === null)
      return res.status(404).json({
        status: 'error',
        message: 'User Not Found',
      });
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    user,
    status: 'success',
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, isScrumMaster, userName, projects, company } = req.body;
  let users = null;
  const errorParams = [];
  if (!verify.validEmail(email)) {
    errorParams.push('Email');
  }
  if (!verify.validBoolean(isScrumMaster)) {
    errorParams.push('isScrumMaster');
  }
  if (!verify.validString(userName)) {
    errorParams.push('Username');
  }
  if (!Array.isArray(projects)) {
    errorParams.push('Projects');
  }
  if (!uuidValidate(company)) {
    errorParams.push('Company');
  }
  if (projects.length > 0) {
    for (let index = 0; index < projects.length; index += 1) {
      if (!uuidValidate(projects[index])) {
        errorParams.push(`Project Id ${projects[index]}`);
      }
      // eslint-disable-next-line
      if ((await projectsData.getProjectById(projects[index])) === null) {
        return res.status(404).json({
          status: 'error',
          message: 'Project Not Found',
        });
      }
    }
    if ((await companyData.getCompanyById(company)) === null) {
      return res.status(404).json({ status: 'error', message: 'Company Not Found' });
    }
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    users = await userData.updateUser(id, email, isScrumMaster, userName, projects, company);
    if (users === null)
      return res.status(404).json({
        status: 'error',
        message: 'User Not Found',
      });
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    users,
    status: 'success',
  });
});

module.exports = router;
