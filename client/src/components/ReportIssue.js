import React, { useState } from 'react';
import '../App.css';

const Projects = (props) => {
  console.log(props.match.params.id)
  return (
    <form >
         <h1> Report Issue </h1>
         <label>
        Comments:
        <input type="text" name="createdBy" id="createdBy" />
        </label>
      <br></br>
     <button className="button">
                  SUBMIT
                </button>
    </form>
  )
}

export default Projects;






