import React, {useState} from 'react';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import './card.css';
import Dropdown from '../Dropdown/Dropdown';
import Chip from '../Chip/chip'

function Card() {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <div className='card'>
        <div className='card_top'>
            <div className='card_top_labels'>
                <Chip text='Frontend' color='green'/>
            </div>
            <div className='card_top_more' onClick={()=>{setShowDropDown(true)}} >
            <MoreHorizontal />
            {showDropDown && (
            <Dropdown
            onClose={()=>{setShowDropDown(false)}}>
              <div className='card_dropdown'>
              <p>Delete Card</p>
              </div>
            </Dropdown>
            )}
            </div>
        </div>
      <div className='card_title'>
          Card 1
      </div>
      <div className='card_footer'>
          <p><Clock/> 5 May</p>
          <p><CheckSquare/> 2</p>
      </div>
    </div>
  )
}

export default Card
