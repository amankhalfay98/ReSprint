import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Api from "../services/api";
import { Card, Container, Button, Accordion, ListGroup } from "react-bootstrap";

const UserStories = (props) => {
  console.log(props.location);
  const [storyy, setstoryy] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [comments, setComments] = useState(undefined);

  useEffect(() => {
    const api = new Api();
    let storyId = localStorage.getItem("story");
    async function getStories() {
      try {
        const { story } = await api.getStoryById(storyId);
        console.log(story);
        if (story) {
          setstoryy(story);
          try {
            const { user } = await api.getUserById(story.assignedTo);
            console.log(user);
            if (user) setUser(user);
            const { comments } = await api.getAllComments(story.id);
            console.log(comments);
            if (comments) {
              setComments(comments);
            }
          } catch (error) {
            alert(error.message);
            console.log(error.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getStories();
  }, []);

  const optionGenerator = (com) => {
    return (
      <section key={com.id}>
        <div className="friend">
          <div key={com.id} className="data">
            <p className="name">{com.name}</p>
            <p>{com.comment}</p>
          </div>
        </div>
      </section>
    );
  };

  let comment =
    user &&
    comments &&
    comments.map((com) => {
      return optionGenerator(com);
    });

  if (storyy && user) {
    let border = "light";
    if (storyy?.status.toLowerCase() === "completed") border = "Success";
    if (storyy?.status.toLowerCase() === "in progess") border = "Info";
    if (storyy?.status.toLowerCase() === "review") border = "Dark";
    if (storyy?.status.toLowerCase() === "to do") border = "Danger";
    return (
      <>
        <Container>
          <Card key={storyy.id} border={border} className="left-text">
            <Card.Header className="left-text" as="h1">
              User Story
            </Card.Header>
            <Card.Body className="left-text">
              <Card.Title className="left-text">
                Title: {storyy.title}
              </Card.Title>
              <ListGroup.Item className="left-text">
                Description: {storyy.description}
              </ListGroup.Item>
              <ListGroup.Item className="left-text">
                Assigned To: {user.userName}
              </ListGroup.Item>
              <ListGroup.Item className="left-text">
                Assigned To: {user.userName}
              </ListGroup.Item>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Comments</Accordion.Header>
                  <Accordion.Body>
                    {comment}{" "}
                    <Link
                      to={{
                        pathname: `/reportissue/${storyy.id}`,
                        project: `${storyy.projectId}`,
                      }}
                    >
                      Add Comment
                    </Link>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Card className="left-text">
                <ListGroup variant="flush">
                  <ListGroup.Item className="left-text">
                    Created Date: {storyy.createdAt}
                  </ListGroup.Item>
                  <ListGroup.Item className="left-text">
                    Modified Date: {storyy.modifiedAt}
                  </ListGroup.Item>
                  <ListGroup.Item className="left-text">
                    Status: {storyy.status}
                  </ListGroup.Item>
                  <ListGroup.Item className="left-text">
                    Type: {storyy.type}
                  </ListGroup.Item>
                  <ListGroup.Item className="left-text">
                    Sprint: {storyy.sprint}
                  </ListGroup.Item>
                  <ListGroup.Item className="left-text">
                    Story Point: {storyy.storyPoint}
                  </ListGroup.Item>
                  <ListGroup.Item className="left-text">
                    Priority: {storyy.priority}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <ul>
                      <li>
                        {" "}
                        <Link
                          to={{
                            pathname: `/reportissue/${storyy.id}`,
                            project: `${storyy.projectId}`,
                          }}
                        >
                          Add Comment
                        </Link>
                      </li>
                      <li>
                        <Link to={{ pathname: `/editform` }}>Edit Story</Link>
                      </li>
                      <li>
                        <Link to={{ pathname: `/backlog` }}>Go to Backlog</Link>
                      </li>
                    </ul>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  } else {
    return <h2>Loading...</h2>;
  }
};

export default UserStories;
