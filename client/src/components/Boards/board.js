import React, { useState } from 'react';
import './board.css';
import { MoreHorizontal } from 'react-feather';
import Card from '../Card/card';
import Editable from '../Editable/editable.js'
import Dropdown from '../Dropdown/Dropdown';

function Board() {
	const [showDropDown, setShowDropDown] = useState(false);
	return (
		<div className="board">
			<div className="board_top">
				<p className="board_top_title">
					To Do <span>4</span>{' '}
				</p>
				<div
					className="board_top_more"
					onClick={() => {
						setShowDropDown(true);
					}}
				>
					<MoreHorizontal />
					{showDropDown && (
						<Dropdown
							onClose={() => {
								setShowDropDown(false);
							}}
						>
							<div className="board_dropdown">
								<p>Delete Board</p>
							</div>
						</Dropdown>
					)}
				</div>
			</div>
			<div className="board_cards custom_scroll">
				<Card />
				<Card />
				<Editable
					displayClass="board_cards_add"
					text="Add Card"
					placeholder="Enter Card title"
				/>
			</div>
		</div>
	);
}

export default Board;
