import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
function Retrospective() {
	const [state, setState] = useState({ message: '' });

	const listReducer = (state, action) => {
		switch (action.type) {
			case 'ADD_ITEM':
				return state.concat({ name: action.name, id: action.id });
			default:
				throw new Error();
		}
	};

	const initialList = [
		{
			id: 'a',
			name: 'Robin',
		},
		{
			id: 'b',
			name: 'Dennis',
		},
	];

	const [list, dispatchList] = React.useReducer(listReducer, initialList);
	const [name, setName] = React.useState('');

	function handleChange(event) {
		// track input field's state
		setName(event.target.value);
	}

	function handleAdd() {
		// add item
		dispatchList({ type: 'ADD_ITEM', name, id: uuidv4() });

		setName('');
	}

	return (
		<div>
			<AddItem name={name} onChange={handleChange} onAdd={handleAdd} />

			<List list={list} />
		</div>
	);
}
const AddItem = ({ name, onChange, onAdd }) => (
	<div>
		<input type="text" value={name} onChange={onChange} />
		<button type="button" onClick={onAdd}>
			Add
		</button>
	</div>
);

const List = ({ list }) => (
	<ol>
		{list.map((item) => (
			<li key={item.id}>{item.name}</li>
		))}
	</ol>
);

export default Retrospective;
