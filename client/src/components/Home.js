import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import Api from '../services/api';

const Home = () => {
	const [userData, setUserData] = useState(undefined);
	const { currentUser } = useContext(AuthContext);
	console.log('This is coming from the Home Component: ', currentUser.uid);
	// let id = currentUser.uid;
	let id = 'LHo68FuetIOy2gwSlMjV0EtCLSp2';
	useEffect(() => {
		const api = new Api();
		async function getCurrentUserData() {
			try {
				const { user } = await api.getUserById(id);
				console.log(user);
				if (user) setUserData(user);
			} catch (error) {
				console.log(error.message);
			}
		}
		getCurrentUserData();
	}, []);
	console.log(userData);
	return (
		<div>
			Welcome to ReSprint.....
			<p>
				Agile methodology has become the new trend of project management to
				which companies are now switching. ReSprint brings a
				webbasedsolutionforenterpriseswhoworkon Agile based software development
				lifecycle. Project managers can use this application to list down every
				user story onto the Kanban board which can help the team to track the
				progress of each user story (feature) and maximize team efficiency.{' '}
			</p>
			<div>
				<img
					src={'https://resprint-media.s3.amazonaws.com/499714.png'}
					alt="profile_photo"
					width="150"
					height="150"
				/>
			</div>
			<p>
				{' '}
				Teams can keep track of the backlog features and divide their task to
				different sprints for feature tracking. This application will also
				manage sprint retro activities in order to improve on agile based
				project management.
			</p>
		</div>
	);
};

export default Home;
