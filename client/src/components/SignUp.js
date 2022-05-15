import React, { useContext, useState, useEffect } from 'react';
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
	const [companyList, setCompanyList] = useState(undefined);
	const [pwMatch, setPwMatch] = useState('');

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

		isScrumMaster[0].checked ? setUserRole(true) : setUserRole(false);
		setUserCompany(companyName.value);
		setUserDisplayName(displayName.value);
		if (passwordOne.value !== passwordTwo.value) {
			setPwMatch('Passwords do not match');
			return false;
		}
		try {
			let user = await doCreateUserWithEmailAndPassword(
				email.value,
				passwordOne.value,
				displayName.value
			);
			console.log(user);
			//   if (user && currentUser && currentUser.uid !== null) {
			// 	try {
			// 	  createUser(currentUser, userRole, userDisplayName, userCompany);
			// 	} catch (e) {
			// 	  console.log(e);
			// 	}
			//   }
		} catch (error) {
			alert('Firebase: ' + error);
		}

		if (currentUser && currentUser.uid !== null) {
			try {
				createUser(currentUser, userRole, userDisplayName, userCompany);
			} catch (e) {
				console.log(e);
			}
		}
	};

	useEffect(() => {
		const api = new Api();
		async function getAllCompanies() {
			try {
				const { companies } = await api.getCompany();
				console.log(companies);
				if (companies) setCompanyList(companies);
			} catch (error) {
				console.log(error.message);
			}
		}
		getAllCompanies();
	}, []);

	const optionGenerator = (company) => {
		return (
			<option key={company.id} value={company.id}>
				{company.companyName}
			</option>
		);
	};

	const createUser = async (
		currentUser,
		userRole,
		userDisplayName,
		userCompany
	) => {
		const api = new Api();
		const projects = [];
		const { uid, email } = currentUser;
		try {
			const { user } = await api.addUser(
				uid,
				email,
				userRole,
				userDisplayName,
				projects,
				userCompany
			);
			console.log(user);
			if (user) {
				alert('signup successful');
				window.location.href = '/home';
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	let companies =
		companyList &&
		companyList.map((company) => {
			return optionGenerator(company);
		});

	//   if (currentUser && currentUser.uid !== null) {
	// 	try {
	// 	  createUser(currentUser, userRole, userDisplayName, userCompany);
	// 	} catch (e) {
	// 	  console.log(e);
	// 	}
	//   }

	return (
		<div>
			<h6>Sign up</h6>
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
						<select name="companyName" id="companyName">
							<option value="">--Please choose an option--</option>
							{companies}
						</select>
					</label>
				</div>
				<br />
				<UploadImageToS3WithNativeSdk />
				<br />
				<button id="submitButton" name="submitButton" type="submit">
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignUp;
