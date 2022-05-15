import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../firebase/Auth";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../App.css";
import Api from "../services/api";

function Storyform(props) {
  const api = new Api();
  const { currentUser } = useContext(AuthContext);
  const [projectData, setProjectData] = useState(undefined);
  const [projectUsers, setProjectUsers] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [memberName, setMemberName] = useState(false);
  const [type, setType] = useState("");
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const pointsRef = useRef();
  const createdBy = currentUser.uid;
  const comments = [];
  const createdAt = new Date().toISOString();
  const modifiedAt = new Date().toISOString();
  const sprint = 0;
  let members;
  let projectId = localStorage.getItem("project");

  useEffect(() => {
    const api = new Api();
    //let projectId = localStorage.getItem('project');
    async function getAllProjects() {
      try {
        const { project } = await api.getProjectById(projectId);
        console.log(project);
        if (project) setProjectData(project);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllProjects();
  }, [projectId]);

  useEffect(() => {
    const api = new Api();
    //let projectId = localStorage.getItem('project');
    async function getAllUsers() {
      try {
        const { users } = await api.getAllMembers("", projectId);
        console.log(users);
        if (users) setProjectUsers(users);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllUsers();
  }, [projectId]);

  const optionGenerator = (member) => {
    return (
      <option key={member.id} value={member.id}>
        {member.userName}
      </option>
    );
  };

  if (projectData && projectUsers) {
    members =
      projectUsers &&
      projectUsers.map((user) => {
        return optionGenerator(user);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const story = await api.upsertStory({
        createdBy,
        assignedTo: memberName,
        comments,
        createdAt,
        description: descriptionRef.current.value,
        modifiedAt,
        priority: Number(priorityRef.current.value),
        sprint,
        status: "To do",
        storyPoint: Number(pointsRef.current.value),
        title: titleRef.current.value,
        type,
        projectId,
      });
      if (story?.status === "success") {
        alert("New Story Added");
        window.location.href = "/backlog";
      } else {
        alert("Could not create new story");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ maxHeight: "h-100" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Create User Story</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="title">
                  <Form.Label htmlFor="title" className="label-form">
                    Title
                  </Form.Label>
                  <Form.Control
                    id="title"
                    type="text"
                    ref={titleRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label htmlFor="description" className="label-form">
                    Description
                  </Form.Label>
                  <Form.Control
                    id="description"
                    type="text"
                    ref={descriptionRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="label-form">Assign To</Form.Label>
                  <Form.Select
                    name="assignedTo"
                    aria-label="Select Member"
                    required
                    onChange={(e) => setMemberName(e.target.value)}
                  >
                    <option value={""}>Select Member</option>
                    {members}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="label-form">Type</Form.Label>
                  <Form.Select
                    name="type"
                    aria-label="Select Type"
                    required
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value={""}>Select Type</option>
                    <option value="Feature">Feature</option>
                    <option value="Bug">Bug</option>
                    <option value="Enhancement">Enhancement</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group id="priority">
                  <Form.Label htmlFor="priority" className="label-form">
                    Priority
                  </Form.Label>
                  <Form.Control
                    id="priority"
                    type="number"
                    ref={priorityRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="points">
                  <Form.Label htmlFor="points" className="label-form">
                    Story Point
                  </Form.Label>
                  <Form.Control
                    id="points"
                    type="number"
                    ref={pointsRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <br />
                <Button disabled={loading} className="w-100" type="submit">
                  Create Story
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
  //   return (
  //     <form
  //       className="form"
  //       id="add-story"
  //       onSubmit={(e) => {
  //         console.log(description.value);
  //         console.log(title.value);
  //         console.log(priority.value);
  //         console.log(story_point.value);
  //         console.log(e.target.elements.member.value);
  //         e.preventDefault();
  //         try {
  //           api.upsertStory({
  //             createdBy: currentUser.uid,
  //             assignedTo: e.target.elements.member.value,
  //             comments: [],
  //             createdAt: new Date().toISOString(),
  //             description: description.value,
  //             modifiedAt: new Date().toISOString(),
  //             priority: parseInt(priority.value),
  //             sprint: 0,
  //             status: "To do",
  //             storyPoint: parseInt(story_point.value),
  //             title: title.value,
  //             type: "Feature",
  //             projectId: projectId,
  //           });
  //           description.value = "";
  //           title.value = "";
  //           priority.value = "";
  //           story_point.value = "";
  //         } catch (err) {
  //           alert(err.message);
  //         }
  //         alert("Story is created");
  //         window.location.pathname = "/backlog";
  //       }}
  //     >
  //       <h2>Add New User Story</h2>
  //       <div className="form-group">
  //         <label>
  //           Assigned To:
  //           <select name="member" id="member">
  //             <option value="">--Please choose an option--</option>
  //             {members}
  //           </select>
  //         </label>
  //       </div>
  //       <div className="form-group">
  //         <label>
  //           Description:
  //           <br />
  //           <input
  //             ref={(node) => {
  //               description = node;
  //             }}
  //           />
  //         </label>
  //       </div>
  //       <br />
  //       <div className="form-group">
  //         <label>
  //           Priority
  //           <br />
  //           <input
  //             type="number"
  //             ref={(node) => {
  //               priority = node;
  //             }}
  //           />
  //         </label>
  //       </div>
  //       <br />
  //       <div className="form-group">
  //         <label>
  //           Story Point:
  //           <br />
  //           <input
  //             type="number"
  //             ref={(node) => {
  //               story_point = node;
  //             }}
  //           />
  //         </label>
  //       </div>
  //       <br />
  //       <div className="form-group">
  //         <label>
  //           Title:
  //           <br />
  //           <input
  //             ref={(node) => {
  //               title = node;
  //             }}
  //           />
  //         </label>
  //       </div>
  //       <br />
  //       <br />

  //       <Button variant="outlined" type="submit">
  //         Submit
  //       </Button>
  //     </form>
  //   );
}

export default Storyform;
