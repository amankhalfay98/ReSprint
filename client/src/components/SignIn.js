import React, { useState, useRef, useContext } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { AuthContext } from "../firebase/Auth";
import {
	doSignInWithEmailAndPassword,
} from '../firebase/FirebaseFunctions';
import { Link } from 'react-router-dom';

function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await doSignInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

	// const passwordReset = (event) => {
	// 	event.preventDefault();
	// 	let email = document.getElementById('email').value;
	// 	if (email) {
	// 		doPasswordReset(email);
	// 		alert('Password reset email was sent');
	// 	} else {
	// 		alert(
	// 			'Please enter an email address below before you click the forgot password link'
	// 		);
	// 	}
	// };

  if (currentUser !== null) {
    window.location.href = "/home";
  }
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ maxHeight: "h-100" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Sign In</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label htmlFor="email" className="label-form">
                    Email
                  </Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    ref={emailRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label htmlFor="password" className="label-form">
                    Password
                  </Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    ref={passwordRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <br />
                <Button disabled={loading} className="w-100" type="submit">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need to Register? <Link to={"/signup"}>Sign Up</Link>
          </div>
          {/* <div className="w-100 text-center mt-2">
            Forgot Password? <Button disabled={loading} className="w-40 h-15" onClick={passwordReset} type='button'>Click to Reset</Button>
          </div> */}
        </div>
      </Container>
    </>
  );
}
export default SignIn;
