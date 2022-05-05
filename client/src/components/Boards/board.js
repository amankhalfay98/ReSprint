import React from 'react';
import './board.css';
import {MoreHorizontal} from 'react-feather';
import Card from '../Card/card';

function board() {
  return (
    <div className='board'>
        <div className='board_top'>
            <p className='board_top_title'>To Do <span>4</span> </p>
            <MoreHorizontal/>
        </div>
        <div className='board_cards'>
            <Card/>
            <Card/>
        </div>
    </div>
  )
}

export default board
