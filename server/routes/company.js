const express = require('express');

const router = express.Router();
const { validate: uuidValidate } = require('uuid');
const verify = require('../middlewares/validation');
const companyData = require('../data/company');

router.get('/', async (req, res) => {
  const errorParams = [];
  let company;
  const { companyName } = req.query;
  if (companyName && !verify.validString(companyName)) {
    errorParams.push('Company Name');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    company = await companyData.getCompany(companyName);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    companies: company,
    status: 'success',
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const errorParams = [];
  let company;
  if (!uuidValidate(id)) {
    errorParams.push('Company Id');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    company = await companyData.getCompanyById(id);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    company,
    status: 'success',
  });
});

router.post('/', async (req, res) => {
  const { companyName } = req.body;
  let newCompany;
  const errorParams = [];

  if (!verify.validString(companyName)) {
    errorParams.push('Company Name');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    newCompany = await companyData.addCompany(companyName);
    if (newCompany.exists) {
      return res.status(409).json({ status: 'error', message: 'Company already exists' });
    }
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(201).json({
    company: newCompany,
    status: 'success',
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { companyName } = req.body;
  let updatedCompany;
  const errorParams = [];
  if (!uuidValidate(id)) {
    errorParams.push('Id');
  }
  if (!verify.validString(companyName)) {
    errorParams.push('Company Name');
  }
  if (errorParams.length > 0) {
    return res.status(422).json({
      status: 'error',
      message: `${errorParams} is of invalid type`,
    });
  }
  try {
    const company = await companyData.getCompanyById(id);
    if (company === null) {
      return res.status(404).json({ status: 'error', message: 'Company Not Found' });
    }
    updatedCompany = await companyData.updateCompany(id, companyName);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(422).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });
  }
  return res.status(200).json({
    company: updatedCompany,
    status: 'success',
  });
});

module.exports = router;
