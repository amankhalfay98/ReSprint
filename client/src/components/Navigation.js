// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../firebase/Auth';
// import SignOutButton from './SignOut';
// import '../App.css';

// const Navigation = () => {
// 	const { currentUser } = useContext(AuthContext);
// 	return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
// };

// const NavigationAuth = () => {
// 	return (
// 		<nav className="navigation">
// 			<ul>
// 				<li>
// 					<NavLink exact to="/" activeClassName="active">
// 						Landing
// 					</NavLink>
// 				</li>
// 				<li>
// 					<NavLink exact to="/home" activeClassName="active">
// 						Home
// 					</NavLink>
// 				</li>
// 				<li>
// 					<NavLink exact to="/account" activeClassName="active">
// 						Account
// 					</NavLink>
// 				</li>
// 				<li>
// 					<NavLink exact to="/projects" activeClassName="active">
// 						Projects
// 					</NavLink>
// 				</li>
// 				<li>
// 					<NavLink exact to="/kanban" activeClassName="active">
// 						Kanban
// 					</NavLink>
// 				</li>
// 				<li>
// 					<NavLink exact to="/backlog" activeClassName="active">
// 						Backlog
// 					</NavLink>
// 				</li>
// 				<li>
// 					<NavLink exact to="/userstories" activeClassName="active">
// 						UserStories
// 					</NavLink>
// 				</li>
// 				<li>
// 					<NavLink exact to="/retrospective" activeClassName="active">
// 						Retrospective
// 					</NavLink>
// 				</li>
// 				<li>
// 					<SignOutButton />
// 				</li>
// 			</ul>
// 		</nav>
// 	);
// };

// const NavigationNonAuth = () => {
// 	return (
// 		<nav className="navigation">
// 			<ul>
// 				<li>
// 					<NavLink exact to="/" activeClassName="active">
// 						Landing
// 					</NavLink>
// 				</li>
// 				<li>
// 					<NavLink exact to="/signup" activeClassName="active">
// 						Sign-up
// 					</NavLink>
// 				</li>

// 				<li>
// 					<NavLink exact to="/signin" activeClassName="active">
// 						Sign-In
// 					</NavLink>
// 				</li>
// 			</ul>
// 		</nav>
// 	);
// };

// export default Navigation;

import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
import { Nav } from 'react-bootstrap';

const Navigation = () => {
	const { currentUser } = useContext(AuthContext);
	return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
	return (
		// <nav className="navigation">
		// 	<ul>
		// 		<li>
		// 			<NavLink exact to="/" activeClassName="active">
		// 				Landing
		// 			</NavLink>
		// 		</li>
		<Nav variant="pills">
			{/* <ul> */}
			<Nav.Item>
				<NavLink to="/home" activeClassName="active">
					Home
				</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/projects" activeClassName="active">
					Projects
				</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/kanban" activeClassName="active">
					Kanban
				</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/backlog" activeClassName="active">
					Backlog
				</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/userstories" activeClassName="active">
					User-Stories
				</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/retrospective" activeClassName="active">
					Retrospective
				</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/account" activeClassName="active">
					Account
				</NavLink>
			</Nav.Item>

			<Nav.Item>
				<SignOutButton />
			</Nav.Item>
			{/* </ul> */}
		</Nav>
	);
};

const NavigationNonAuth = () => {
	return (
		// <nav className="navigation">
		<Nav variant="pills">
			{/* <ul> */}
			<Nav.Item>
				<NavLink to="/" activeClassName="active">
					Landing
				</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink as={Link} to="/signup" activeClassName="active">
					Sign-up
				</NavLink>
			</Nav.Item>

			<Nav.Item>
				<NavLink as={Link} to="/signin" activeClassName="active">
					Sign-In
				</NavLink>
			</Nav.Item>
			{/* </ul> */}
		</Nav>
	);
};

export default Navigation;
