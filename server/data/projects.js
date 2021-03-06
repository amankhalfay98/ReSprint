const { validate: uuidValidate } = require('uuid');
const uuid = require('uuid');
const verify = require('../middlewares/validation');
const mongoCollections = require('../config/mongoCollections');
const userData = require('./users');

const projectSchema = mongoCollections.projects;
const storiesSchema = mongoCollections.stories;
const commentSchema = mongoCollections.comments;

const getAllProjects = async (company, projectName) => {
  const query = {};
  if (company) {
    query.company = company;
  }
  if (projectName) {
    query.projectName = projectName;
  }
  // if (!uuidValidate(memberId)) {
  //   return { error: true, message: 'Invalid member id' };
  // }
  try {
    const projectsCollection = await projectSchema();
    let projects = await projectsCollection.find(query).collation({ locale: 'en', strength: 2 }).toArray();
    if (projects !== null) {
      projects = projects.map((x) => {
        const val = x;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        val.id = val._id;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        delete val._id;
        return val;
      });
    }
    return projects;
  } catch (error) {
    throw Error(error.message);
  }
};

const getProjectById = async (id) => {
  if (!uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  try {
    const projectsCollection = await projectSchema();
    const project = await projectsCollection.findOne({ _id: id });
    if (project !== null) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      project.id = project._id;
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      delete project._id;
    }
    return project;
  } catch (error) {
    throw Error(error.message);
  }
};

const upsertProject = async (members, master, projectName, userStories, totalSprints, company, memberId, id = uuid.v4()) => {
  if (!uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  if (!verify.validString(memberId)) {
    throw TypeError('Member id is of invalid type');
  }
  if (!Array.isArray(members)) {
    throw TypeError('Members is of invalid type');
  }
  if (!verify.validString(master)) {
    throw TypeError('Master is of invalid type');
  }
  if (!verify.validString(projectName)) {
    throw TypeError('Project Name is of invalid type');
  }
  if (!uuidValidate(company)) {
    throw TypeError('Company is of invalid type');
  }
  if (!Array.isArray(userStories)) {
    throw TypeError('User Stories is of invalid type');
  }
  if (!verify.checkIsProperNumber(totalSprints)) {
    throw TypeError('Total Sprints is of invalid type');
  }
  for (let index = 0; index < members.length; index += 1) {
    if (!verify.validString(members[index])) {
      throw TypeError('Member is of invalid type');
    }
  }
  for (let index = 0; index < userStories.length; index += 1) {
    if (!uuidValidate(userStories[index])) {
      throw TypeError('User Stories is of invalid type');
    }
  }
  try {
    const projectsCollection = await projectSchema();
    let project = await projectsCollection.findOneAndUpdate(
      { _id: id, members: { $in: [memberId] } },
      {
        $set: { members, master, projectName, userStories, totalSprints, company },
      },
      {
        upsert: true,
      }
    );
    const { updatedExisting } = project.lastErrorObject;
    if (project !== null) {
      project = await projectsCollection.findOne({
        _id: id,
      });
      if (project !== null) {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        project.id = project._id;
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        delete project._id;
      }
      for (let index = 0; index < members.length; index += 1) {
        // eslint-disable-next-line
        const user = await userData.getUserById(members[index]);
        if (user !== null) {
          user.projects.push(project.id);
          // eslint-disable-next-line
          const { id, email, isScrumMaster, userName, projects, company } = user;
          // eslint-disable-next-line
          await userData.updateUser(id, email, isScrumMaster, userName, projects, company);
        }
      }
    }
    return { updatedExisting, project };
  } catch (error) {
    if (error.code === 11000) {
      throw ReferenceError('User Not Authorized');
    }
    throw Error(error.message);
  }
};

const deleteProject = async (id) => {
  let project;
  if (!uuidValidate(id)) {
    throw TypeError('Id is of invalid type');
  }
  try {
    const projectsCollection = await projectSchema();
    const storiesCollection = await storiesSchema();
    const commentsCollection = await commentSchema();

    project = await projectsCollection.deleteOne({ _id: id });
    await storiesCollection.deleteMany({ projectId: id });
    await commentsCollection.deleteMany({ projectId: id });
    return project;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  upsertProject,
  deleteProject,
};
