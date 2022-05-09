import React from 'react';
import '../App.css';

const Projects = () => {
  return (
    <div>
      <form>
        <h1> ADD NEW USER STORY </h1>
         <label>
          createdBy:
         <input type="text" name="createdBy" />
         </label>
         <br></br>
         <label>
          assignedTo:
         <input type="text" name="assignedTo" />
         </label>
         <br></br>
         <label>
          comments:
         <input type="text" name="comments" />
         </label>
         <br></br>
         <label>
          createdAt:
         <input type="text" name="createdAt" />
         </label>
         <br></br>
         <label>
          description:
         <input type="text" name="description" />
         </label>
         <br></br>
         <label>
          modifiedAt:
         <input type="text" name="modifiedAt" />
         </label>
         <br></br>
         <label>
          priority
         <input type="text" name="priority" />
         </label>
         <br></br>
         <label>
          sprint
         <input type="text" name="sprint" />
         </label>
         <br></br>
         <label>
          status
         <input type="text" name="status" />
         </label>
         <br></br>
         <label>
          storyPoint
         <input type="text" name="storyPoiny" />
         </label>
         <br></br>
         <label>
          title
         <input type="text" name="title" />
         </label>
         <br></br>
         <label>
          type
         <input type="text" name="type" />
         </label>
         <br></br>
         <label>
          projectId
         <input type="text" name="projectId" />
         </label>
         <br></br>
         <label>
          id
         <input type="text" name="id" />
         </label>
         <br></br>
         <input type="submit" value="Submit" />
       </form>
    </div>
  );
};

export default Projects;
