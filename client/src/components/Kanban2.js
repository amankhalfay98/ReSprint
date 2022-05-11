import React, { useState, useRef } from 'react';
import '../App.css';

function Kanban2() {
    const [dragging,setDragging] = useState(false)
    const dragItem = useRef();

    const handleDragStart=(e,params)=>{
        console.log('drag start...', params)
        dragItem.current = params;
        setDragging(true);

    }
  return (
    <div className='Kanban'>
        <div className='drag-n-drop'>
            <div className='dnd-group' id='to_do'>
                <div className='group-title'>To Do</div>
                <div draggable className={dragging?'current dndn-item':'dnd-item'}>
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
