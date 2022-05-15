import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { doSignOut } from "../firebase/FirebaseFunctions";
import logo from "../logo.svg";
import "../App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";


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
              alt="company"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Resprint
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
			<Nav.Link href="/stats">Statistics</Nav.Link>
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
              alt="company"
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

};

export default Navigation;
