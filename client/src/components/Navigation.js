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
		<Nav variant="pills">
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
				<NavLink to="/account" activeClassName="active">
					Account
				</NavLink>
			</Nav.Item>
		       	<Nav.Item>
				<NavLink to="/stats" activeClassName="active">
					Statistics
				</NavLink>
			</Nav.Item>

			<Nav.Item>
				<SignOutButton />
			</Nav.Item>
		</Nav>
	);
};

const NavigationNonAuth = () => {
	return (
		<Nav variant="pills">
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
		</Nav>
	);
};

export default Navigation;
