import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { AuthContext } from '../firebase/Auth';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { Link, useHistory } from 'react-router-dom';
import Api from '../services/api';

export default function SignUp() {
	const [isScrumMaster, setIsScrumMaster] = useState(false);
	const [companyList, setCompanyList] = useState(undefined);
	const [company, setCompany] = useState('');
	const { currentUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const history = useHistory();
	const api = new Api();

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
	}

	useEffect(() => {
		async function createUser(currentUser, isScrumMaster, nameRef, company) {
			let projects = [];
			let addUser;
			try {
				addUser = await api.addUser(
					currentUser.uid,
					currentUser.email,
					isScrumMaster,
					nameRef.current.value,
					projects,
					company
				);
			} catch (error) {
				console.log(error.message);
			}
			if (addUser.status === 'success') {
				history.push('/home');
			}
		}
		if (currentUser && currentUser.uid && currentUser.email) {
			try {
				createUser(currentUser, isScrumMaster, nameRef, company);
			} catch (error) {
				alert(error.message);
			}
		}
	}, [currentUser, api, company, history, isScrumMaster]);

	return (
		<>
			<Container
				className="d-flex align-items-center justify-content-center"
				style={{ maxHeight: 'h-100' }}
			>
				<div className="w-100" style={{ maxWidth: '400px' }}>
					<Card>
						<Card.Body>
							<h2 className="text-center mb-4">Sign Up</h2>
							<Form onSubmit={handleSubmit}>
								<Form.Group id="name">
									<Form.Label className="label-form">Name</Form.Label>
									<Form.Control
										type="text"
										ref={nameRef}
										required
									></Form.Control>
								</Form.Group>
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
								<Form.Group>
									<Form.Label className="label-form">
										Are you a Scrum Master or a Developer?
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
									/>
								</Form.Group>
								<Form.Group>
									<Form.Select
										name="companyName"
										aria-label="Select Company"
										required
										onChange={(e) => setCompany(e.target.value)}
									>
										<option value={''}>Select Company</option>
										{companies}
									</Form.Select>
								</Form.Group>
								<br />
								<Button disabled={loading} className="w-100" type="submit">
									Sign Up
								</Button>
							</Form>
						</Card.Body>
					</Card>
					<div className="w-100 text-center mt-2">
						Already have an account? <Link to={'/signin'}>Log In</Link>
					</div>
				</div>
			</Container>
		</>
	);
}
