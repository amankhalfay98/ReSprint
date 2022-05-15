
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

import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { doSignOut } from "../firebase/FirebaseFunctions";
import logo from "../logo.svg";
import "../App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// import React, { useContext } from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import { AuthContext } from '../firebase/Auth';
// import SignOutButton from './SignOut';
// import '../App.css';
// import { Nav } from 'react-bootstrap';


const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {

  const history = useHistory();
  const logout = () => {
    history.push("/signin");
    doSignOut();
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="/home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Resprint
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/kanban">Kanban</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
            <Nav.Link onClick={() => logout()} href="/signin">
              Sign Out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

const NavigationNonAuth = () => {
  return (
    <>
      <Navbar className="mb-5" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Resprint
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/signin">Sign In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );

// 	return (
// 		<Nav variant="pills">
// 			<Nav.Item>
// 				<NavLink to="/home" activeClassName="active">
// 					Home
// 				</NavLink>
// 			</Nav.Item>
// 			<Nav.Item>
// 				<NavLink to="/projects" activeClassName="active">
// 					Projects
// 				</NavLink>
// 			</Nav.Item>
// 			<Nav.Item>
// 				<NavLink to="/account" activeClassName="active">
// 					Account
// 				</NavLink>
// 			</Nav.Item>
// 		       	<Nav.Item>
// 				<NavLink to="/stats" activeClassName="active">
// 					Statistics
// 				</NavLink>
// 			</Nav.Item>

// 			<Nav.Item>
// 				<SignOutButton />
// 			</Nav.Item>
// 		</Nav>
// 	);
// };

// const NavigationNonAuth = () => {
// 	return (
// 		<Nav variant="pills">
// 			<Nav.Item>
// 				<NavLink to="/" activeClassName="active">
// 					Landing
// 				</NavLink>
// 			</Nav.Item>
// 			<Nav.Item>
// 				<NavLink as={Link} to="/signup" activeClassName="active">
// 					Sign-up
// 				</NavLink>
// 			</Nav.Item>

// 			<Nav.Item>
// 				<NavLink as={Link} to="/signin" activeClassName="active">
// 					Sign-In
// 				</NavLink>
// 			</Nav.Item>
// 		</Nav>
// 	);

};

export default Navigation;
