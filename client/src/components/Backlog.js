import React, { useState, useEffect  } from "react";
import '../App.css';
import Api from '../services/api'
import { Link } from 'react-router-dom';


 const Backlog = (props) => {
  const api = new Api();
  let card = null;
  const [storyData, setStoryData] = useState(undefined);


  useEffect(() => {
    console.log("Props.location.project", typeof(props.location.project))
    async function getStories() {
      try {
        const {stories } = await api.getStories(props.location.project) ;
        console.log(stories);
        if (stories) setStoryData(stories);
      } catch (error) {
        console.log(error.message);
      }
    }
    getStories();

    
  }, [props.location.project]);



  
  if (storyData && Array.isArray(storyData)) {
 { 
    card = storyData.map((story) => {
      //If Story is not in Backlog that is sprint no is not 0 then display "Add to next sprint button " and "Add to next sprint"
      if(story.sprint!=0){ return (
      
        <div className="project_card" key={story.id}>
          <Link to={{pathname:'/individualUserStory', story:`${story.id}`}}>
              
             <h2>USER STORY : {story.title} </h2> </Link>
             <h2>SPRINT NO: {story.sprint} </h2>
				
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
				}} >ADD USER STORY TO NEXT SPRINT</button>
        <Link to={{pathname:'/kanban', sprint:`${story.sprint}`, project:`${props.location.project}`}}>
        <button>Go to Kanban</button>
        </Link>
              </div>
			
      )}else{
        //If story is in sprint 0 that means already in Backlog hence only display add to next sprint button
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
    <div >
      <h1>Backlogs</h1>
  {card}
    </div>
  );
};

export default Backlog;

