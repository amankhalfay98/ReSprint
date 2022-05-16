const connection = require('../config/mongoConnection');
const data = require('../data');
const company = data.company;
// const users = data.users;
const stories = data.stories;
const projects = data.projects;
const comments = data.comments;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  //Adding two companies (Company1 and Company2)
  const company1 = await company.addCompany('ABC Corporation');
  const company2 = await company.addCompany('XYZ Corporation');

  //Adding Projects for Companies
  const project1 = await projects.upsertProject(['GmnZa5JkOLUx4oB9YVGFOljlHEz2', 'gLZY8BZS5IXuOYYA4GQoJz0dXjW2'], 'GmnZa5JkOLUx4oB9YVGFOljlHEz2', 'Green House Project', [], 4, '2016963a-6331-4c42-b2e8-97d5984e8470', 'GmnZa5JkOLUx4oB9YVGFOljlHEz2');
  const project2 = await projects.upsertProject(['GmnZa5JkOLUx4oB9YVGFOljlHEz2', 'gLZY8BZS5IXuOYYA4GQoJz0dXjW2'], 'GmnZa5JkOLUx4oB9YVGFOljlHEz2', 'Technical Project', [], 2, '2016963a-6331-4c42-b2e8-97d5984e8470', 'GmnZa5JkOLUx4oB9YVGFOljlHEz2');

  //Adding stories
  const story1 = await stories.upsertStory(
    project1.project.id,
    'GmnZa5JkOLUx4oB9YVGFOljlHEz2',
    'gLZY8BZS5IXuOYYA4GQoJz0dXjW2',
    [],
    '2022-05-14T17:54:01.548',
    'this is user story 1',
    '2022-05-16T00:38:17.551Z',
    3,
    0,
    'To do',
    2,
    'USER STORY 1',
    'Feature'
  );
  const story2 = await stories.upsertStory(
    project2.project.id,
    'GmnZa5JkOLUx4oB9YVGFOljlHEz2',
    'gLZY8BZS5IXuOYYA4GQoJz0dXjW2',
    [],
    '2022-05-14T17:54:01.548',
    'this is user story 2',
    '2022-05-16T00:38:17.551Z',
    2,
    0,
    'To do',
    2,
    'USER STORY 2',
    'Bug'
  );

  //Adding Comments
  const comment1 = await comments.addComment('GmnZa5JkOLUx4oB9YVGFOljlHEz2', 'Aman', 'This is my first comment', project1.project.id, story1.id);
  const comment2 = await comments.addComment('GmnZa5JkOLUx4oB9YVGFOljlHEz2', 'Aaditi', 'This is my second comment', project2.project.id, story2.id);

  // await connection.closeConnection();
  console.log('Done!');
}

main().catch((error) => {
  console.log(error);
});
