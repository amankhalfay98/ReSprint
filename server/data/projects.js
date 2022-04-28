const { validate: uuidValidate } = require('uuid');
const uuid = require('uuid');
const verify = require('../middlewares/validation');
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

const upsertProject = async (members, master, projectName, userStories, totalSprints, id) => {
  id === undefined ? uuid.v4() : id;
  if (!uuidValidate(id)) {
    throw Error('Id is of invalid type');
  }
  if (!Array.isArray(members)) {
    throw Error('Members is of invalid type');
  }
  if (!uuidValidate(master)) {
    throw Error('Master is of invalid type');
  }
  if (!verify.validString(projectName)) {
    throw Error('Project Name is of invalid type');
  }
  if (!Array.isArray(userStories)) {
    throw Error('User Stories is of invalid type');
  }
  if (!verify.checkIsProperNumber(totalSprints)) {
    throw Error('Total Sprints is of invalid type');
  }
  for (let index = 0; index < members.length; index += 1) {
    if (!uuidValidate(members[index])) {
      throw Error('Member is of invalid type');
    }
  }
  for (let index = 0; index < userStories.length; index += 1) {
    if (!uuidValidate(userStories[index])) {
      throw Error('User Stories is of invalid type');
    }
  }
  try {
    const projectsCollection = await projectSchema();
    let project = await projectsCollection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          members,
          master,
          projectName,
          userStories,
          totalSprints,
        },
      },
      {
        upsert: true,
      }
    );
    let updatedExisting = project.lastErrorObject.updatedExisting;
    if (project !== null) {
      project = await projectsCollection.findOne({
        _id: id,
      });
    }
    return { updatedExisting, project };
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getAllProjects,
  upsertProject,
};
