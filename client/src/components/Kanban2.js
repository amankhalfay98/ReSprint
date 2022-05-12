import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import Api from '../services/api'

function Kanban2(props) {
    let project = props.location.project;
    let sprint = props.location.sprint
    console.log('Project: '+project+' Sprint: '+sprint)
    const [dragging,setDragging] = useState(false)
    const dragItem = useRef();
    let card= null;

    const [storyData, setStoryData] = useState(undefined);
  useEffect(() => {
    const api = new Api();
    async function getStories() {
      try {
        const {stories } = await api.getStories(project,sprint) ;
        console.log(stories);
        if (stories) setStoryData(stories);
      } catch (error) {
        console.log(error.message);
      }
    }
    getStories();
  }, [project,sprint]);

    const handleDragStart=(e,params)=>{
        console.log('drag start...', params)
        dragItem.current = params;
        setDragging(true);

    }

    const renderStories=(story)=>{
        return(
            <div draggable className={dragging?'current dndn-item':'dnd-item'} key={story.id}>
                    <div>
                        <p>
                            {story.title}
                        </p>
                    </div>
                </div>
        )

    }

    if (storyData && Array.isArray(storyData)) {
        card = storyData.map((story) => {
          // if(user.company===project.company){
    
          // }
          return(
            renderStories(story)
          )
        });
      }
  return (
    <div className='Kanban'>
        <div className='drag-n-drop'>
            <div className='dnd-group' name='to_do' id='to_do'>
                <div className='group-title'>To Do</div>
                {card}

                {/* <div draggable className={dragging?'current dndn-item':'dnd-item'}>
                    <div>
                        <p>
                            Item 1
                        </p>
                    </div>
                </div>
                <div className='dnd-item'>
                    <div>
                        <p>
                            Item 2
                        </p>
                    </div>
                </div> */}
            </div>
            <div className='dnd-group' id='in_progress'>
                <div className='group-title'>In Progress</div>
                <div draggable className='dnd-item'>
                    <div>
                        <p>
                            Item 1
                        </p>
                    </div>
                </div>
                <div className='dnd-item'>
                    <div>
                        <p>
                            Item 2
                        </p>
                    </div>
                </div>
            </div>
            <div className='dnd-group' id='review'>
                <div className='group-title'>Review</div>
                <div draggable className='dnd-item'>
                    <div>
                        <p>
                            Item 1
                        </p>
                    </div>
                </div>
                <div className='dnd-item'>
                    <div>
                        <p>
                            Item 2
                        </p>
                    </div>
                </div>
            </div>
            <div className='dnd-group' id='completed'>
                <div className='group-title'>Completed</div>
                <div 
                draggable 
                onDragStart={(e)=>{handleDragStart(e,{})}}
                key='1'
                className='dnd-item'>
                    <div>
                        <p>
                            Item 1
                        </p>
                    </div>
                </div>
                <div className='dnd-item'>
                    <div>
                        <p>
                            Item 2
                        </p>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Kanban2
