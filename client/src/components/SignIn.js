// import React, { useContext } from 'react';
// // import SocialSignIn from './SocialSignIn';
// import { Redirect } from 'react-router-dom';
// import { AuthContext } from '../firebase/Auth';
// import {
// 	doSignInWithEmailAndPassword,
// 	doPasswordReset,
// } from '../firebase/FirebaseFunctions';

// function SignIn() {
// 	const { currentUser } = useContext(AuthContext);
// 	const handleLogin = async (event) => {
// 		event.preventDefault();
// 		let { email, password } = event.target.elements;

// 		try {
// 			await doSignInWithEmailAndPassword(email.value, password.value);
// 		} catch (error) {
// 			alert(error);
// 		}
// 	};

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
// 	if (currentUser) {
// 		return <Redirect to="/home" />;
// 	}
// 	return (
// 		<div>
// 			<h1>Log in</h1>
// 			<form onSubmit={handleLogin}>
// 				<div className="form-group">
// 					<label>
// 						Email:
// 						<input
// 							className="form-control"
// 							name="email"
// 							id="email"
// 							type="email"
// 							placeholder="Email"
// 							required
// 						/>
// 					</label>
// 				</div>
// 				<div className="form-group">
// 					<label>
// 						Password:
// 						<input
// 							className="form-control"
// 							name="password"
// 							type="password"
// 							placeholder="Password"
// 							required
// 						/>
// 					</label>
// 				</div>
// 				<button type="submit">Log in</button>

// 				<button className="forgotPassword" onClick={passwordReset}>
// 					Forgot Password
// 				</button>
// 			</form>

// 			{/* <br />
// 			<SocialSignIn /> */}
// 		</div>
// 	);
// }

// export default SignIn;

import React, { useState, useRef, useContext } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { AuthContext } from "../firebase/Auth";
import { doSignInWithEmailAndPassword ,doPasswordReset} from "../firebase/FirebaseFunctions";
import { Link } from "react-router-dom";

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

  const passwordReset = (event) => {
		event.preventDefault();
		let email = document.getElementById('email').value;
		if (email) {
			doPasswordReset(email);
			alert('Password reset email was sent');
		} else {
			alert(
				'Please enter an email address below before you click the forgot password link'
			);
		}
	};


  if (currentUser !== null) {
    window.location.href = '/home';
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
              <h2 className="text-center mb-4">Sign In</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label className="label-form">Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label className="label-form">Password</Form.Label>
                  <Form.Control
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
