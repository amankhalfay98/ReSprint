import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../firebase/Auth";
import { doChangePassword } from "../firebase/FirebaseFunctions";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../App.css";

function ChangePassword() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  console.log(currentUser);
  const [loading, setLoading] = useState(false);
  const currentPasswordRef = useRef();
  const newPasswordOneRef = useRef();
  const newPasswordTwoRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    if (newPasswordOneRef.current.value !== newPasswordTwoRef.current.value) {
      setPwMatch("New Passwords do not match, please try again");
      return false;
    }

    try {
      setLoading(true);
      await doChangePassword(
        currentUser.email,
        currentPasswordRef.current.value,
        newPasswordTwoRef.current.value
      );
      alert("Password has been changed, you will now be logged out");
    } catch (error) {
      alert(error);
    }
    setLoading(false);
    window.location.href = "/signin";
  }
  if (currentUser.providerData[0].providerId === "password") {
    return (
      <>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ maxHeight: "h-100" }}
        >
          <div className="w-100" style={{ maxWidth: "600px" }}>
            <Card>
              <Card.Body>
                <h1 className="text-center mb-4">{`Hi  ${currentUser.displayName}!`}</h1>
                {pwMatch && <h2 className="error">{pwMatch}</h2>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="currentPassword">
                    <Form.Label
                      htmlFor="currentPassword"
                      className="label-form"
                    >
                      Current Password
                    </Form.Label>
                    <Form.Control
                      id="currentPassword"
                      type="password"
                      ref={currentPasswordRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="newPasswordOne">
                    <Form.Label htmlFor="newPasswordOne" className="label-form">
                      New Password
                    </Form.Label>
                    <Form.Control
                      id="newPasswordOne"
                      type="password"
                      ref={newPasswordOneRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="newPasswordTwo">
                    <Form.Label htmlFor="newPasswordTwo" className="label-form">
                      Confirm New Password
                    </Form.Label>
                    <Form.Control
                      id="newPasswordTwo"
                      type="password"
                      ref={newPasswordTwoRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <br />
                  <Button disabled={loading} className="w-100" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <div>
        <h1>
          You are signed in using a Social Media Provider, You cannot change
          your password
        </h1>
      </div>
    );
  }
}

export default ChangePassword;
