import React from 'react';
import './Modal.css';

function Modal({ setOpenModal }) {
	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseBtn">
					<button
						onClick={() => {
							setOpenModal(false);
						}}
					>
						X
					</button>
				</div>
				<div className="title">
					<h2>Just some more information to get you started..</h2>
				</div>
				<div className="body">
					<p>Are you a Scrum Master or a Developer?</p>
					<input type="radio" value="Scrum Master" name="role" /> Scrum Master
					<input type="radio" value="Developer" name="role" /> Developer
					<br />
					<br />
					<p>What is the name of your company?</p>
					<label>
						Company Name:
						<input
							required
							name="companyName"
							type="text"
							placeholder="Company Name"
						/>
					</label>
				</div>

				<div className="footer">
					<button
						onClick={() => {
							setOpenModal(false);
						}}
						id="cancelBtn"
					>
						Cancel
					</button>
					<button id="submitButton" name="submitButton" type="submit">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
