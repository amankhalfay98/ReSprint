import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import Api from '../services/api';
import { Button } from '@material-ui/core';
//import {v4 as uuidv4} from 'uuid';


function Storyform(props) {
  const api = new Api();
  const { currentUser } = useContext(AuthContext);
  const [projectData, setProjectData] = useState(undefined);
  const [projectUsers, setProjectUsers] = useState(undefined);
  console.log(props);
  let description;
	let title;
	let story_point;
	let priority;
  let members;
  //let memberName;

  useEffect(() => {
    const api = new Api();
    async function getAllProjects() {
      try {
        const {project } = await api.getProjectById(props.location.project) ;
        console.log(project);
        if (project) setProjectData(project);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllProjects();
  }, [props.location.project]);

  useEffect(() => {
    const api = new Api();
    async function getAllUsers() {
      try {
        const {users } = await api.getAllMembers('',props.location.project);
        console.log(users);
        if (users) setProjectUsers(users);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllUsers();
  }, [props.location.project]);

  const optionGenerator = (member) => {
		return (
			<option key={member.id} value={member.id}>
				{member.userName}
			</option>
		);
	};


  // async function getMemberDetails(users) {
  //   for(let i =0; i<users.length;i++){
  //    let member = await api.getUserById(users[i])
  //    members = optionGenerator(member);
  //   }
    
  //   // if (users) {
  //   //   memberData = Promise.all(users.map((user) => getMemberById(user)));
  //   // }
  //   //return Promise.all(memberData);
  // }


	if(projectData&& projectUsers){
    //getMemberDetails(projectData.members);
     members = projectUsers && projectUsers.map((user) => {
        return optionGenerator(user);
      });
  }
  

  return (
    <form
				className="form"
				id="add-story"
				onSubmit={(e) => {
					console.log(description.value);
					console.log(title.value);
					console.log(priority.value);
          console.log(story_point.value);
          console.log(e.target.elements.member.value);
					e.preventDefault();
          // const {
          //   member
          // } = e.target.elements;
					try {
						
						api.upsertStory({
						createdBy:currentUser.uid,
            assignedTo:e.target.elements.member.value,
            comments:[],
            createdAt: new Date().toISOString(),
            description:description.value,
            modifiedAt: new Date().toISOString(),
            priority:parseInt(priority.value),
            sprint:0,
            status:'To do',
            storyPoint:parseInt(story_point.value),
            title:title.value,
            type:'Feature',
            projectId:props.location.project
						});
						description.value = '';
						title.value = '';
						priority.value = '';
            story_point.value='';
						
					} catch (err) {
						alert(err.message);
					}
                    alert('Story is created');
                    window.history.pushState({project:`${props.location.project}`},'/backlog')
                    window.history.back();
						//window.location.pathname = '/projects';
				}}
			>
				<h2>Add New Project</h2>
        <div className="form-group">
        <label>
					Assigned To:
					<select name="member" id="member" >
						<option value="">--Please choose an option--</option>
						{members}
					</select>
				</label>
        </div>
				<div className="form-group">
					<label>
						Description:
						<br />
						<input
							ref={(node) => {
								description = node;
							}}
							//autoFocus={true}
						/>
					</label>
				</div>
				<br />
				<div className="form-group">
					<label>
						Priority
						<br />
						<input type='number'
							ref={(node) => {
								priority = node;
							}}
						/>
					</label>
				</div>
				<br />
        <div className="form-group">
					<label>
						Story Point:
						<br />
						<input type='number'
							ref={(node) => {
								story_point = node;
							}}
						/>
					</label>
				</div>
        <br/>
        <div className="form-group">
					<label>
						Title:
						<br />
						<input
							ref={(node) => {
								title = node;
							}}
						
						/>
					</label>
				</div>
				<br />	
				<br />
				
				<Button variant="outlined" type="submit">
					Submit
				</Button>
			</form>
  )
}

export default Storyform




// import React, { useState } from 'react';
// import '../App.css';
// import Api from '../services/api'
// import {v4 as uuidv4} from 'uuid';

// const Storyform = () => {
//   let date = new Date()
//   const [user, setUser] = useState({createdBy: "",
//   assignedTo:"",
//   comments:[],
//   createdAt:date.toISOString(),
//   description:"",
//   modifiedAt:date.toISOString(),
//   priority:"",
//   sprint:"0",
//   status:"To do",
//   storyPoint:"",
//   title:"",
//   type:"",
//   projectId:"",
//   id: uuidv4() })

//   const submit = (e) => {
//     e.preventDefault()
//     const api = new Api();
//     upsertStory(user)
//       async function upsertStory(user) {
//         try {
//           console.log("this is the new variables", user.createdAt)
//           //const stories = 
//           await api.upsertStory(user.createdBy,user.assignedTo,user.comments,user.createdAt,user.description,user.modifiedAt,parseInt(user.priority),parseInt(user.sprint),user.status,parseInt(user.storyPoint),user.title,user.type,user.projectId,user.id) ;
//         } catch (error) {
//           console.log(error.message);
//         }
//       }
//       setUser({createdBy: "",
//       assignedTo:"",
//       comments:[],
//       createdAt:date.toISOString(),
//       description:"",
//       modifiedAt:date.toISOString(),
//       priority:"",
//       sprint:"0",
//       status:"To do",
//       storyPoint:"",
//       title:"",
//       type:"",
//       projectId:"",
//       id:"" })
//   }

//   // return (
//   //   <form onSubmit={submit}>
//   //        <h1> ADD NEW USER STORY </h1>
//   //        <label>
//   //       createdBy:
//   //       <input type="text" name="createdBy" id="createdBy"   value={user.createdBy}
//   //       onChange={e => setUser({...user,createdBy: e.target.value})}/>
//   //       </label>
//   //         <br></br>
//   //        <label>
//   //        assignedTo:
//   //        <input type="text" name="assignedTo" id="assignedTo"   value={user.assignedTo}
//   //       onChange={e => setUser({...user, assignedTo: e.target.value})}/>
//   //       </label>
//   //       <br></br>
//   //       <label>
//   //       priority
//   //         <input type="text" name="priority" id="priority"   value={user.priority}
//   //       onChange={e => setUser({...user,priority: e.target.value})}/>
//   //       </label>
//   //        <br></br>
//   //        <label>
//   //         storyPoint
//   //        <input type="text" name="storyPoint" id="storyPoint"   value={user.storyPoint}
//   //       onChange={e => setUser({...user,storyPoint: e.target.value})}/>
//   //        </label>
//   //        <br></br>
//   //        <label>
//   //        title
//   //       <input type="text" name="title" id="title"   value={user.title}
//   //       onChange={e => setUser({...user,title: e.target.value})}/>
//   //       </label>
//   //       <br></br>
//   //       <label>
//   //       description: 
//   //     <input
//   //       type="text"
//   //       name="description"
//   //       value={user.description}
//   //       onChange={e => setUser({...user,description: e.target.value})}
//   //     />
//   //     </label>
//   //     <br></br>
//   //     <label>
//   //       type: 
//   //     <input
//   //       type="text"
//   //       name="type"
//   //       value={user.type}
//   //       onChange={e => setUser({...user,type: e.target.value})}
//   //     />
//   //     </label>
//   //     <br></br>
//   //     <label>
//   //       projectId: 
//   //     <input
//   //       type="text"
//   //       name="projectId"
//   //       value={user.projectId}
//   //       onChange={e => setUser({...user,projectId: e.target.value})}
//   //     />
//   //     </label>
//   //     <br></br>
//   //    <button className="button">
//   //                 SUBMIT
//   //               </button>
//   //   </form>
//   // )
// }

// export default Storyform;






