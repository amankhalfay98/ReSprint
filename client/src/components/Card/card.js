import React from 'react';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import './card.css';
import Chip from '../Chip/chip'

function card() {
  return (
    <div className='card'>
        <div className='card_top'>
            <div className='card_top_labels'>
                <Chip text='Frontend' color='green'/>
            </div>
            <MoreHorizontal/>
        </div>
      <div className='card_title'>
          Card 1
      </div>
      <div className='card_footer'>
          <p><Clock/></p>
          <p><CheckSquare/></p>
      </div>
    </div>
  )
}

export default card
