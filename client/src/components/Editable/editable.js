import React, { useState } from 'react'
import { X } from 'react-feather'
import './editable.css'

function Editable(props) {
    const [showEdit,setShowEdit]= useState(false)
  return (
    <div className='editable'>
     { showEdit ?
     <form className={`editable_edit ${props.editClass || " "}`}
     onSubmit={(e)=>{
         e.preventDefault()
         if(props.onSubmit){
             props.onSubmit()
         }
         }}>
         <input type='text' 
         defaultValue={props.text}
         placeholder={props.placeholder ||"Enter item"}/>
         <div className='editable_edit_footer'>
             <button type='submit'>{props.buttonText || 'Add'}</button>
             <X onClick={()=>{setShowEdit(false)}}/>
         </div>
     </form>
     : <p className={`editable_display ${props.displayClass || ""}`} onClick={()=>{setShowEdit(true)}}>{props.text || 'Add Card'}</p> 
     }
    </div>
  )
}

export default Editable
