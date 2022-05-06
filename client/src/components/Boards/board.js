import React from 'react';
import './board.css';
import {MoreHorizontal} from 'react-feather';
import Card from '../Card/card';
import Editable from '../Editable/editable'

function board() {
  return (
    <div className='board'>
        <div className='board_top'>
            <p className='board_top_title'>To Do <span>4</span> </p>
            <MoreHorizontal/>
        </div>
        <div className='board_cards custom_scroll'>
            <Card/>
            <Card/>
            <Editable displayClass='board_cards_add'
            text='Add Card'
            placeholder = 'Enter Card title'/>
        </div>
    </div>
  )
}

export default board