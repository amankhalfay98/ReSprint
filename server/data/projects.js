const { validate: uuidValidate } = require('uuid');
const mongoCollections = require('../config/mongoCollections');

const projectSchema = mongoCollections.projects;

const getAllProjects = async (memberId) => {
  if (!uuidValidate(memberId)) {
    return { error: true, message: 'Invalid member id' };
  }
  try {
    const projectsCollection = await projectSchema();
    const projects = await projectsCollection.find({ members: { $in: [memberId] } }).toArray();
    return projects;
  } catch (error) {
    throw Error();
  }
};

module.exports = {
  getAllProjects,
};
