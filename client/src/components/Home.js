import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import Api from '../services/api';

const Home = () => {
	const [userData, setUserData] = useState(undefined);
	const [userPhoto, setUserPhoto] = useState(
		'https://resprint-media.s3.amazonaws.com/man.png'
	);
	const { currentUser } = useContext(AuthContext);
	// console.log('This is coming from the Home Component: ', currentUser.uid);
	// let id = currentUser.uid;
	// let id = 'LHo68FuetIOy2gwSlMjV0EtCLSp2';
	useEffect(() => {
		const api = new Api();
		async function getCurrentUserData() {
			try {
				const { user } = await api.getUserById(currentUser.uid);
				console.log(user);
				if (user) {
					setUserData(user);
					if (
						user.photoURL !== 'https://resprint-media.s3.amazonaws.com/undefined'
					) {
						setUserPhoto(user.photoURL);
					}
				}
			} catch (error) {
				alert(error.message);
			}
		}
		getCurrentUserData();
	}, [currentUser]);
	console.log(userData);

	if (userData) {
		return (
			<div>
				<h1>Welcome to ReSprint, {`${userData.userName}`}!</h1>
				<br />
				<br />
				<div>
					<img
						src={`${userPhoto}`}
						alt="profile_photo"
						width="150"
						height="150"
					/>
				</div>
				<br />
				<br />
				<p>
					Agile methodology has become the new trend of project management to
					which companies are now switching. ReSprint brings a
					web based solution for enterprises who work on Agile based software
					development lifecycle. Project managers can use this application to
					list down every user story onto the Kanban board which can help the
					team to track the progress of each user story (feature) and maximize
					team efficiency.{' '}
				</p>
				<br />

				<p>
					{' '}
					Teams can keep track of the backlog features and divide their task to
					different sprints for feature tracking. This application will also
					manage sprint retro activities in order to improve on agile based
					project management.
				</p>
			</div>
		);
	} else {
		return <h3>Loading..</h3>;
	}
};

export default Home;
