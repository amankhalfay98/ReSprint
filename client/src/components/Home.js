import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';

const Home = () => {
	const { currentUser } = useContext(AuthContext);
	console.log('This is coming from the Home Component: ', currentUser.uid);
	return (
		<div>
			Welcome to ReSprint.....

			<p>Agile methodology has become the new trend of project
management to which companies are now switching.
ReSprint brings a webbasedsolutionforenterpriseswhoworkon
Agile based software development lifecycle. Project managers
can use this application to list down every user story onto the
Kanban board which can help the team to track the progress of
each user story (feature) and maximize team efficiency. </p>

<p> Teams can keep track of the backlog features and divide their task to
different sprints for feature tracking. This application will also
manage sprint retro activities in order to improve on agile based
project management.</p>
		</div>
	);
};

export default Home;
