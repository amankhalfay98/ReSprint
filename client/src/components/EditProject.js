import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';
import Api from '../services/api';
import { AuthContext } from '../firebase/Auth';

function EditProject() {
	const api = new Api();
	const { currentUser } = useContext(AuthContext);
	
	let totalSprints;
	let projectName;
	let company;
	let employees = [];
    let projectId = localStorage.getItem('project');
	const [memberList, setMemberList] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [companyName, setCompanyName] = useState(undefined);
    const [updateProject, setUpdateProject] = useState(undefined);

	useEffect(() => {
		const api = new Api();
		async function getUserById() {
			try {
				const { user } = await api.getUserById(currentUser.uid);
				console.log(user);
				if (user) {
					setUser(user);
					try {
						const { users } = await api.getAllMembers(user.company, '');
						console.log(users);
						if (users) {
							setMemberList(users);
							const { company } = await api.getCompanyById(user.company);
							if (company) setCompanyName(company);
                            const { project } = await api.getProjectById(projectId);
							if (project) setUpdateProject(project);

						}
					} catch (error) {
						console.log(error.message);
					}
				}
			} catch (error) {
				console.log(error.message);
			}
		}
		getUserById();

	}, [currentUser]);

    function Editingform(){
        try {
            if (!projectName.value) {
                throw Error('Project Name is Required');
            }
            if (employees.length === 0) {
                throw Error(
                    'Project cannot not be created with 0 members. Please add all members to the project.'
                );
            }
            api.upsertProject({
                master: user.id,
                projectName: projectName.value,
                company: companyName.id,
                userStories: updateProject.userStories,
                members: employees,
                totalSprints: parseInt(totalSprints.value),
                memberId: user.id,
                id: updateProject.id
            });
            totalSprints.value = '';
            projectName.value = '';
            setCompanyName('');
            alert('Project has been edited');
            window.location.pathname = '/projects';
        } catch (err) {
            alert(err.message);
        }

    }


	//}, [currentUser,projectId]);


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

	if (user && companyName && updateProject) {
		return (
			<form
				className="form"
				id="add-project"
				onSubmit={(e) => {
					console.log(totalSprints.value);
					console.log(projectName.value);
					console.log(company.value);
					e.preventDefault();
					employees = Array.prototype.slice
						.call(document.querySelectorAll('#member option:checked'), 0)
						.map(function (v) {
							return v.value;
						});
					// console.log('Employees: ', employees);
                    Editingform()
				

// 					console.log('Employees: ', employees);
// 					try {
// 						if (!projectName.value) {
// 							throw Error('Project Name is Required');
// 						}
// 						if (employees.length === 0) {
// 							throw Error(
// 								'Project cannot not be created with 0 members. Please add all members to the project.'
// 							);
// 						}
// 						api.upsertProject({
// 							master: user.id,
// 							projectName: projectName.value,
// 							company: companyName.id,
// 							userStories: updateProject.userStories,
// 							members: employees,
// 							totalSprints: parseInt(totalSprints.value),
// 							memberId: user.id,
// 						});
// 						totalSprints.value = '';
// 						projectName.value = '';
// 						setCompanyName('');
// 						alert('Project is created');
// 						window.location.pathname = '/projects';
// 					} catch (err) {
// 						alert(err.message);
// 					}
				}}
			>
				<h2>Edit Project</h2>
				<div className="form-group">
					<label>
						Total Sprints:
						<br />
						<input
							required
							type="number" defaultValue={updateProject.totalSprints}
							ref={(node) => {
								totalSprints = node;
							}}
							autoFocus={true}
						/>
					</label>
				</div>
				<br />
				<div className="form-group">
					<label>
						Project Name:
						<br />
						<input defaultValue={updateProject.projectName}
							ref={(node) => {
								projectName = node;
							}}
						/>
					</label>
				</div>
				<br />

				<div className="form-group">
					<label>
						Company Name:
						<br />
						<input
							disabled
							value={companyName.companyName}
							ref={(node) => {
								company = node;
							}}
						/>
					</label>
				</div>
				<br />
				<label>
					Employee Name: (Add all Members for this Project)
					<select multiple name="member" id="member">
						<option value="">--Please choose an option--</option>
						{members}
					</select>
				</label>
				<br />
				<br />
				<Button variant="outlined" type="submit">
					Submit
				</Button>
			</form>
		);
	} else {
		return <h2>Loading...</h2>;
	}
}


export default EditProject;
//export default EditProject;

