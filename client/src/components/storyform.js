// import React, { useState, useEffect } from 'react';
// import '../App.css';
// import Api from '../services/api'

// const Projects = (props) => {
//   const [user, setUser] = useState({description:""})

//   const submit = e => {
//     e.preventDefault()
//     const api = new Api();
//     upsertStory(user)
//       async function upsertStory(user) {
//         try {
//           console.log("this is the new description", user.description)
//           const {stories } = await api.upsertStory(user.description) ;
//           console.log(stories);
//         } catch (error) {
//           console.log(error.message);
//         }
//       }
//       setUser({description: ""})
//   }

//   return (
//     <form onSubmit={submit}>
//          <h1> ADD NEW USER STORY </h1>
//          <label>
//         createdBy:
//         <input type="text" name="createdBy" id="createdBy" />
//         </label>
//           <br></br>
//          <label>
//          assignedTo:
//          <input type="text" name="assignedTo" id="assignedTo"  />
//         </label>
//          <br></br>
//          <label>
//          comments:
//         <input type="text" name="comments" id="comments" />
//         </label>
//         <br></br>
//         <label>
//          createdAt:
//           <input type="text" name="createdAt" id="createdAt" />
//          </label>
//         <br></br>
//          <label>
//            modifiedAt:
//          <input type="text" name="modifiedAt" id="modifiedAt" />
//          </label>
//         <br></br>
//         <label>
//         priority
//           <input type="text" name="priority" id="priority" />
//         </label>
//         <br></br>
//          <label>
//            sprint
//          <input type="text" name="sprint" id="sprint" />
//          </label>
//          <br></br>
//          <label>
//           status
//         <input type="text" name="status" id="status" />
//         </label>
//          <br></br>
//          <label>
//           storyPoint
//          <input type="text" name="storyPoint" id="storyPoint" />
//          </label>
//          <br></br>
//          <label>
//          title
//         <input type="text" name="title" id="title" />
//         </label>
//         <br></br>
//         Description: 
//       <input
//         type="text"
//         name="user[name]"
//         value={user.description}
//         onChange={e => setUser({description: e.target.value})}
//       />
//       <br></br>
//      <button
//                   className="button"
//                 >
//                   SUBMIT
//                 </button>
//     </form>
//   )
// }

// export default Projects;






import React, { useState } from 'react';
import '../App.css';
import Api from '../services/api'
import {v4 as uuidv4} from 'uuid';

const Projects = () => {
  let date = new Date()
  const [user, setUser] = useState({createdBy: "",
  assignedTo:"",
  comments:[],
  createdAt:date.toISOString(),
  description:"",
  modifiedAt:date.toISOString(),
  priority:"",
  sprint:"",
  status:"",
  storyPoint:"",
  title:"",
  type:"",
  projectId:"",
  id: uuidv4() })

  const submit = e => {
    e.preventDefault()
    const api = new Api();
    upsertStory(user)
      async function upsertStory(user) {
        try {
          console.log("this is the new variables", user.createdAt)
          const stories = await api.upsertStory(user.createdBy,user.assignedTo,user.comments,user.createdAt,user.description,user.modifiedAt,parseInt(user.priority),parseInt(user.sprint),user.status,parseInt(user.storyPoint),user.title,user.type,user.projectId,user.id) ;
        } catch (error) {
          console.log(error.message);
        }
      }
      setUser({createdBy: "",
      assignedTo:"",
      comments:[],
      createdAt:date.toISOString(),
      description:"",
      modifiedAt:date.toISOString(),
      priority:"",
      sprint:"",
      status:"",
      storyPoint:"",
      title:"",
      type:"",
      projectId:"",
      id:"" })
  }

  return (
    <form onSubmit={submit}>
         <h1> ADD NEW USER STORY </h1>
         <label>
        createdBy:
        <input type="text" name="createdBy" id="createdBy"   value={user.createdBy}
        onChange={e => setUser({...user,createdBy: e.target.value})}/>
        </label>
          <br></br>
         <label>
         assignedTo:
         <input type="text" name="assignedTo" id="assignedTo"   value={user.assignedTo}
        onChange={e => setUser({...user, assignedTo: e.target.value})}/>
        </label>
        <br></br>
        <label>
        priority
          <input type="text" name="priority" id="priority"   value={user.priority}
        onChange={e => setUser({...user,priority: e.target.value})}/>
        </label>
        <br></br>
         <label>
           sprint
         <input type="text" name="sprint" id="sprint"   value={user.sprint}
        onChange={e => setUser({...user,sprint: e.target.value})}/>
         </label>
         <br></br>
         <label>
          status
        <input type="text" name="status" id="status"   value={user.status}
        onChange={e => setUser({...user,status: e.target.value})}/>
        </label>
         <br></br>
         <label>
          storyPoint
         <input type="text" name="storyPoint" id="storyPoint"   value={user.storyPoint}
        onChange={e => setUser({...user,storyPoint: e.target.value})}/>
         </label>
         <br></br>
         <label>
         title
        <input type="text" name="title" id="title"   value={user.title}
        onChange={e => setUser({...user,title: e.target.value})}/>
        </label>
        <br></br>
        <label>
        description: 
      <input
        type="text"
        name="description"
        value={user.description}
        onChange={e => setUser({...user,description: e.target.value})}
      />
      </label>
      <br></br>
      <label>
        type: 
      <input
        type="text"
        name="type"
        value={user.type}
        onChange={e => setUser({...user,type: e.target.value})}
      />
      </label>
      <br></br>
      <label>
        projectId: 
      <input
        type="text"
        name="projectId"
        value={user.projectId}
        onChange={e => setUser({...user,projectId: e.target.value})}
      />
      </label>
      <br></br>
     <button className="button">
                  SUBMIT
                </button>
    </form>
  )
}

export default Projects;











