const { validate: uuidValidate } = require('uuid');
const uuid = require('uuid');
const verify = require('../middlewares/validation');
const mongoCollections = require('../config/mongoCollections');

const companySchema = mongoCollections.company;

const getCompany = async (companyName) => {
  const query = {};
  if (companyName) {
    if (!verify.validString(companyName)) {
      throw TypeError('Story Id is of invalid type');
    }
    query.companyName = companyName;
  }
  try {
    const companyCollection = await companySchema();
    let companies = await companyCollection.find(query).collation({ locale: 'en', strength: 2 }).toArray();
    if (companies !== null) {
      companies = companies.map((x) => {
        const val = x;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        val.id = val._id;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        delete val._id;
        return val;
      });
    }
    return companies;
  } catch (error) {
    throw Error(error.message);
  }
};

const getCompanyById = async (id) => {
  if (!uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  const companyCollection = await companySchema();
  try {
    const company = await companyCollection.findOne({ _id: id });
    if (company !== null) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      company.id = company._id;
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      delete company._id;
    }
    return company;
  } catch (error) {
    throw Error(error.message);
  }
};

const addCompany = async (companyName) => {
  if (!verify.validString(companyName)) {
    throw TypeError('Company name is missing or is of invalid type');
  }
  const companyExists = await getCompany(companyName);
  if (companyExists.length > 0) {
    return { exists: true };
  }
  const companyDocument = {
    _id: uuid.v4(),
    companyName,
  };
  const companyCollection = await companySchema();
  const addedCompany = await companyCollection.insertOne(companyDocument);
  const newId = addedCompany.insertedId;
  const addedCompanyData = await getCompanyById(newId);
  return addedCompanyData;
};

const updateCompany = async (id, companyName) => {
  if (id && !uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  if (!verify.validString(companyName)) {
    throw TypeError('Company Name is missing or is of invalid type');
  }
  try {
    const companyCollection = await companySchema();
    await companyCollection.updateOne({ _id: id }, { $set: { companyName } });
    const updatedCompany = await getCompanyById(id);
    return updatedCompany;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getCompany,
  addCompany,
  getCompanyById,
  updateCompany,
};
