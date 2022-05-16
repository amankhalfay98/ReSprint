import React, { useState, useRef, useContext, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { AuthContext } from "../firebase/Auth";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { Link, useHistory } from "react-router-dom";
import Api from "../services/api";
import AWS from "aws-sdk";
require("dotenv").config();

const S3_BUCKET = "resprint-media";
const REGION = "us-east-1";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export default function SignUp() {
  const [isScrumMaster, setIsScrumMaster] = useState(false);
  const [companyList, setCompanyList] = useState(undefined);
  const [company, setCompany] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const api = new Api();

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(undefined);

  const handleFileInput = (e) => {
    //console.log(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      // ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  useEffect(() => {
    const api = new Api();
    async function getAllCompanies() {
      try {
        const { companies } = await api.getCompany();
        console.log(companies);
        if (companies) setCompanyList(companies);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllCompanies();
  }, []);

  const optionGenerator = (company) => {
    return (
      <option key={company.id} value={company.id}>
        {company.companyName}
      </option>
    );
  };

  const companies =
    companyList &&
    companyList.map((company) => {
      return optionGenerator(company);
    });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      uploadFile(selectedFile);
      setLoading(true);
      await doCreateUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
    // history.push("/home");
  }

  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     setIsScrumMaster(e.target.value);
  //   };

  console.log(fileName);

  useEffect(() => {
    async function createUser(
      currentUser,
      isScrumMaster,
      nameRef,
      company,
      fileName
    ) {
      let projects = [];
      let addUser;
      try {
        addUser = await api.addUser(
          currentUser.uid,
          currentUser.email,
          isScrumMaster,
          nameRef.current.value,
          projects,
          company,
          fileName
        );
      } catch (error) {
        console.log(error.message);
      }
      if (addUser.status === "success") {
        history.push("/home");
      }
    }
    if (currentUser && currentUser.uid && currentUser.email) {
      try {
        createUser(currentUser, isScrumMaster, nameRef, company, fileName);
      } catch (error) {
        alert(error.message);
      }
    }
  }, [currentUser, api, company, history, isScrumMaster, fileName]);

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ maxHeight: "h-100" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Sign Up</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label htmlFor="name" className="label-form">
                    Name <span className="required-color"> *</span>
                  </Form.Label>
                  <Form.Control
                    id="name"
                    type="text"
                    ref={nameRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label htmlFor="email" className="label-form">
                    Email <span className="required-color"> *</span>
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
                    Password <span className="required-color"> *</span>
                  </Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    ref={passwordRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="isScrumMaster" className="label-form">
                    Are you a Scrum Master or a Developer?{" "}
                    <span className="required-color"> *</span>
                  </Form.Label>
                  <Form.Check
                    className="label-form"
                    name="isScrumMaster"
                    label="Scrum Master"
                    type="radio"
                    value={true}
                    onChange={(e) => setIsScrumMaster(true)}
                    required
                    inline
                    id="isScrumMaster"
                  />
                  <Form.Check
                    className="label-form"
                    name="isScrumMaster"
                    label="Developer"
                    type="radio"
                    value={false}
                    onChange={(e) => setIsScrumMaster(false)}
                    required
                    inline
                    id="isScrumMaster"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="companyName" className="label-form">
                    Select Company <span className="required-color"> *</span>
                  </Form.Label>
                  <Form.Select
                    id="companyName"
                    name="companyName"
                    aria-label="Select Company"
                    required
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option value={""}>Select Company</option>
                    {companies}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label
                    htmlFor="image-aws"
                    name="image-aws"
                    className="label-form"
                  >
                    Upload Profile Image [{progress}%]
                  </Form.Label>
                  <Form.Control
                    id="image-aws"
                    type="file"
                    accept=".png,.jpg"
                    onChange={handleFileInput}
                  />
                </Form.Group>
                <br />
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to={"/signin"}>Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
