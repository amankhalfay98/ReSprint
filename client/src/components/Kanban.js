import React from 'react';
import '../App.css';
import Board from './Boards/board';
import Editable from './Editable/Editable';

const Kanban = () => {
	return (
		<div className="kanban">
			<div className="kanban_navbar">
				<h2>Kanban Board</h2>
			</div>
			<div className="kanban_outer">
				<div className="kanban_boards">
					<Board />
					<Board />
					<div className="kanban_boards_board">
						<Editable
							displayClass="kanban_boards_board_add"
							text="Add Board"
							placeholder="Enter Board title"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Kanban;
