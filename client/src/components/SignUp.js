import React, { useContext, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import UploadImageToS3WithNativeSdk from './UploadImageToS3WithNativeSdk';
// import SocialSignIn from './SocialSignIn';
import Api from '../services/api';
function SignUp() {
	const { currentUser } = useContext(AuthContext);
	const [userDisplayName, setUserDisplayName] = useState(undefined);
	const [userRole, setUserRole] = useState(undefined);
	const [userCompany, setUserCompany] = useState(undefined);

	// const [modalOpen, setModalOpen] = useState(false);
	const [pwMatch, setPwMatch] = useState('');
	const api = new Api();
	const handleSignUp = async (e) => {
		e.preventDefault();

		const {
			displayName,
			email,
			passwordOne,
			passwordTwo,
			isScrumMaster,
			companyName,
		} = e.target.elements;

		setUserRole(isScrumMaster.value);
		setUserCompany(companyName.value);
		setUserDisplayName(displayName.value);
		if (passwordOne.value !== passwordTwo.value) {
			setPwMatch('Passwords do not match');
			return false;
		}

		try {
			await doCreateUserWithEmailAndPassword(
				email.value,
				passwordOne.value,
				displayName
			);
		} catch (error) {
			alert(error);
		}
	};

	// if (currentUser) {
	// 	setUserUID(currentUser.uid);
	// }

	// useEffect(() => {
	// 	const api = new Api();
	// 	async function addUser() {
	// 		try {
	// 			api.addUser(userUID, userEmail, userRole, userRole);
	// 		} catch (error) {
	// 			console.log(error.message);
	// 		}
	// 	}
	// 	addUser();
	// }, []);

	if (currentUser) {
		console.log(currentUser);
		var isTrueSet = userRole === 'true';
		const projects = [];
		api.addUser(
			currentUser.uid,
			currentUser.email,
			isTrueSet,
			userDisplayName,
			//currentUser.displayName,
			projects,
			userCompany
			// 'b0e5f68a-43a5-49fb-8a75-bae2e421f4aa'
		);
		// return <Redirect to="/details" />;
		alert('signup successful');
		window.location.href = '/home';
		//return <Redirect to="/home" />;
	}

	return (
		<div>
			<h1>Sign up</h1>
			{pwMatch && <h4 className="error">{pwMatch}</h4>}
			<form onSubmit={handleSignUp}>
				<div className="form-group">
					<label>
						Full Name:
						<input
							className="form-control"
							required
							name="displayName"
							type="text"
							placeholder="Full Name"
						/>
					</label>
				</div>
				{/* <div className="form-group">
					<label>
						Last Name:
						<input
							className="form-control"
							required
							name="lastName"
							type="text"
							placeholder="Last Name"
						/>
					</label>
				</div> */}
				<div className="form-group">
					<label>
						Email:
						<input
							className="form-control"
							required
							name="email"
							type="email"
							placeholder="Email"
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						Password:
						<input
							className="form-control"
							id="passwordOne"
							name="passwordOne"
							type="password"
							placeholder="Password"
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						Confirm Password:
						<input
							className="form-control"
							name="passwordTwo"
							type="password"
							placeholder="Confirm Password"
							required
						/>
					</label>
					<p>Are you a Scrum Master or a Developer?</p>
					<input type="radio" value="true" name="isScrumMaster" /> Scrum Master
					<input type="radio" value="false" name="isScrumMaster" /> Developer
					<p>What is the name of your company?</p>
					<label>
						Company Name:
						<input
							className="form-control"
							required
							id="companyName"
							name="companyName"
							type="text"
							placeholder="Company Name"
						/>
					</label>
				</div>
				<br />
				<UploadImageToS3WithNativeSdk />
				<br />
				<button id="submitButton" name="submitButton" type="submit">
					Sign Up
				</button>
			</form>

			{/* <br />
			<SocialSignIn /> */}
		</div>
	);
}

export default SignUp;
