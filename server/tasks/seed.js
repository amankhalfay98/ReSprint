
const dbConnection = require("../config/mongoConnection");
const data = require('../data');
const company = data.company;
const users = data.users;
const stories = data.stories;
const projects = data.projects;
const comments = data.comments;

async function main() {
  
  const db = await dbConnection.connectToDb();
  await db.dropDatabase();


//Adding two companies (Company1 and Company2)
 const company1 = await company.addCompany("ABC Corporation");
 const company2 = await company.addCompany("XYZ Corporation");  

   //Adding 2 users
   const user1 = await users.createUser( "aman@gmail.com", true, Aman, [], company1.company);
   const user2 = await users.createUser( "aaditi@gmail.com", false, Aaditi, [], company2.company); 

//Adding Projects for Companies
 const project1 = await projects.upsertProject([user1.id,user2.id], user1.id, "Green House Project", [], 4, company1.company, user1.id);
 const project2 = await projects.upsertProject([user1.id,user2.id], user1.id, "Technical Project", [], 2, company2.company, user1.id);

 
//Adding stories
 const story1 = await stories.upsertStory(project1.id, user1.id, user2.id, [], "2022-05-14T17:54:01.548", "this is user story 1", "2022-05-16T00:38:17.551Z", 3, 0, "To do", 2, "USER STORY 1", "Feature" )
 const story2 = await stories.upsertStory(project2.id, user1.id, user2.id, [], "2022-05-14T17:54:01.548", "this is user story 2", "2022-05-16T00:38:17.551Z", 2, 0, "To do", 2, "USER STORY 2", "Bug" )

 //Adding Comments
 const comment1 = await comments.addComment(user1.id, "Aman", "This is my first comment", project1.id, story1.id)
 const comment2 = await comments.addComment(user2.id, "Aaditi", "This is my second comment", project2.id, story2.id)

  await connection.closeConnection();
  console.log('Done!');
}

main().catch((error) => {
  console.log(error);
});



