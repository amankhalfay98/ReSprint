import React from 'react';
import '../App.css';
import Board from './Boards/board';

const Projects = () => {
  return (
      <div className='kanban'>
    <div className='kanban_navbar'>
      <h2>Kanban Board</h2> 
    </div>
    <div className='kanban_outer'>
        <div className='kanban_boards'>
            <Board/>
            <Board/>
            <Board/>
        </div>
        </div>
    </div>
  );
};

export default Projects;