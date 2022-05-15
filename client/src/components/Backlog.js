//FINAL

//Adding Add to sprints buttons:

import React, { useState, useEffect  } from "react";
// { AuthContext } from '../firebase/Auth';
import '../App.css';
import Api from '../services/api'
import { NavLink, Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core';

 const Backlog = (props) => {
  const api = new Api();
  let card = null;
  const [storyData, setStoryData] = useState(undefined);


  useEffect(() => {
    const api = new Api();
    let project = localStorage.getItem('project')
    async function getStories() {
      try {
        const {stories } = await api.getStories(project,'') ;
        console.log(stories);
        if (stories) setStoryData(stories);
      } catch (error) {
        console.log(error.message);
      }
    }
    getStories(); 
  }, []);

  const handelClick=(stor)=>{
    localStorage.setItem('story',`${stor.id}`)
    window.location.href='/individualUserStory';
  }



  
  if (storyData && Array.isArray(storyData)) {
 { 
    card = storyData.map((story) => {

      if(parseInt(story.sprint)!==0){
      return (
      
      <Grid item key={story.id}>
				<Card  variant="outlined">
					<CardActionArea>
            <button onClick={(e)=>{e.preventDefault(); handelClick(story)}}>More Details</button>
          {/* <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}> */}
          {/* <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}> */}
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
                   {/* <NavLink to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>{story.title}</NavLink>  */}
							{story.title}
                {/* <button>Move To Right</button> */}
								</Typography>
							</CardContent>
              
              {/* </Link> */}
					</CardActionArea>
          </Card>
          
          <button 	onClick={(e) => {

					e.preventDefault();
          console.log("story is",story)
					try {
						
						api.upsertStory({
						createdBy:story.createdBy,
            assignedTo: story.assignedTo,
            comments:story.comments,
            createdAt: story.createdAt,
            description: story.description,
            modifiedAt: story.modifiedAt,
            priority:story.priority,
            sprint:0,
            status:story.status,
            storyPoint:story.storyPoint,
            title:story.title,
            type:story.type,
            id:story.id,
            projectId:props.location.project
						});
						
					} catch (err) {
						alert(err.message);
					}
                    alert('Added User Story To Backlog');
						//window.location.pathname = '/projects';

				}} >ADD USER STORY TO BACKLOG</button>

<button 	onClick={(e) => {
					e.preventDefault();
          console.log("story is",story)
          let nextsprint=story.sprint+1
          console.log("nextsprint",nextsprint)
					try {
						
						api.upsertStory({
						createdBy:story.createdBy,
            assignedTo: story.assignedTo,
            comments:story.comments,
            createdAt: story.createdAt,
            description: story.description,
            modifiedAt: story.modifiedAt,
            priority:story.priority,
            sprint:nextsprint,
            status:story.status,
            storyPoint:story.storyPoint,
            title:story.title,
            type:story.type,
            id:story.id,
            projectId:props.location.project
						});
						
					} catch (err) {
						alert(err.message);
					}
                    alert(`Added User Story To Sprint ${nextsprint}`);
						//window.location.pathname = '/projects';
				}} >ADD USER STORY TO NEXT SPRINT</button>
        <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>
        <button>Go to Kanban</button>
        </Link>
        </Grid>
			
      )}else{
        return (
      
          <div className="project_card" key={story.id}>
            <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}>
                
               <h2>USER STORY : {story.title} </h2> </Link>
               <h2>SPRINT NO: {story.sprint} </h2>
        
            <button 	onClick={(e) => {
            e.preventDefault();
            console.log("story is",story)
            let nextsprint=story.sprint+1
            console.log("nextsprint",nextsprint)
            try {
              
              api.upsertStory({
              createdBy:story.createdBy,
              assignedTo: story.assignedTo,
              comments:story.comments,
              createdAt: story.createdAt,
              description: story.description,
              modifiedAt: story.modifiedAt,
              priority:story.priority,
              sprint:nextsprint,
              status:story.status,
              storyPoint:story.storyPoint,
              title:story.title,
              type:story.type,
              id:story.id,
              projectId:props.location.project
              });
              
            } catch (err) {
              alert(err.message);
            }
                      alert(`Added User Story To Sprint ${nextsprint}`);
              //window.location.pathname = '/projects';
          }} >ADD USER STORY TO NEXT SPRINT</button>
          <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>
          <button>Go to Kanban</button>
          </Link>
                </div>
        

        )
      }
     
      
    });
  }
  }


  return (

    <div className="drag-n-drop">
    <div className="dnd-group">
    <NavLink to={{pathname:'/kanban', sprint:`0`, project:`${props.location.project}`}}>
      <div className="group-title">Backlog</div>
      </NavLink> 
        <div>
        
      </div>
    </div>
       <div className="dnd-group">
       <NavLink to={{pathname:'/kanban', sprint:`1`, project:`${props.location.project}`}}> 
       <div className="group-title">sprint 1</div>
       </NavLink> 
        <div className="dnd-item">
          <div>
            {card}
        </div>
     </div>

    </div>
    <div className="dnd-group">
    <NavLink to={{pathname:'/kanban', sprint:`2`, project:`${props.location.project}`}}>
       <div className="group-title">sprint 2</div>
       </NavLink>
        <div className="dnd-item">
          <div>
       
        </div>
     </div>
    </div>
    <div className="dnd-group">
    <NavLink to={{pathname:'/kanban', sprint:`3`, project:`${props.location.project}`}}>
       <div className="group-title">sprint 3</div>
       </NavLink>
        <div className="dnd-item">
          <div>
            <p>ITEM 1</p>
        </div>
     </div>
      <div className="dnd-item">
        <div>
          <p>ITEM 2</p>
         </div>
       </div>
    </div>

    <NavLink to={{pathname:'/storyform', project:`${props.location.project}`}}>Add New User Story</NavLink>

    {/* <p>{sprintt}</p> */}


    </div>
  );
};

export default Backlog;

