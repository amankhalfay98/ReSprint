import React, { useContext, useState, useEffect, useRef } from "react";
import "../App.css";
import { Form, Button, Card, Container } from "react-bootstrap";
import Api from "../services/api";
import { AuthContext } from "../firebase/Auth";

function NewProject() {
  const api = new Api();
  const { currentUser } = useContext(AuthContext);
  console.log(
    "This is coming from the New Project Component: ",
    currentUser.uid
  );
  const nameRef = useRef();
  const totalSprintsRef = useRef();
  let employees = [];
  const [memberList, setMemberList] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [companyName, setCompanyName] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const api = new Api();
    async function getUserById() {
      try {
        const { user } = await api.getUserById(currentUser.uid);
        console.log(user);
        if (user) {
          setUser(user);
          try {
            const { users } = await api.getAllMembers(user.company, "");
            console.log(users);
            if (users) {
              setMemberList(users);
              const { company } = await api.getCompanyById(user.company);
              if (company) setCompanyName(company);
            }
          } catch (error) {
            console.log(error.message);
            alert(error.message);
          }
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
    getUserById();
  }, [currentUser]);

  const optionGenerator = (member) => {
    return (
      <option key={member.id} value={member.id}>
        {member.userName}
      </option>
    );
  };

  let members =
    user &&
    memberList &&
    memberList.map((member) => {
      return optionGenerator(member);
    });

  async function handleSubmit(e) {
    e.preventDefault();
    employees = Array.prototype.slice
      .call(document.querySelectorAll("#member option:checked"), 0)
      .map(function (v) {
        return v.value;
      });
    try {
      setLoading(true);
      const project = await api.upsertProject({
        master: user.id,
        projectName: nameRef.current.value,
        company: companyName.id,
        userStories: [],
        members: employees,
        totalSprints: Number(totalSprintsRef.current.value),
        memberId: user.id,
      });
      if (project?.status === "success") {
        alert("Project Created");
        window.location.href = "/projects";
      } else {
        alert("Could not create new project");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  if (user && companyName) {
    return (
      <>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ maxHeight: "h-100" }}
        >
          <div className="w-100" style={{ maxWidth: "600px" }}>
            <Card>
              <Card.Body>
                <h1 className="text-center mb-4">Create Project</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="title">
                    <Form.Label htmlFor="title" className="label-form">
                      Project Name
                    </Form.Label>
                    <Form.Control
                      id="title"
                      type="text"
                      ref={nameRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="companyName">
                    <Form.Label htmlFor="companyName" className="label-form">
                      Company Name
                    </Form.Label>
                    <Form.Control
                      id="companyName"
                      type="text"
                      placeholder={companyName.companyName}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group id="member">
                    <Form.Label htmlFor="member" className="label-form">
                      Project Members
                    </Form.Label>
                    <Form.Select
                      multiple
                      id="member"
                      name="member"
                      aria-label="Select Member"
                      required
                    >
                      <option value={""}>Select all Project Member</option>
                      {members}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group id="totalSprints">
                    <Form.Label htmlFor="totalSprints" className="label-form">
                      Total Sprints
                    </Form.Label>
                    <Form.Control
                      id="totalSprints"
                      type="number"
                      ref={totalSprintsRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <br />
                  <Button disabled={loading} className="w-100" type="submit">
                    Create Project
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default NewProject;
