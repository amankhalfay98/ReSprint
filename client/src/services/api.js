import axios, { post, get, put, patch } from 'axios';
//import { auth } from '../firebase/Firebase';

const host = 'http://resprint.herokuapp.com';
//const host = 'https://cf0f-98-109-149-176.ngrok.io';
// Change token here
const token = '2bbbb2cb-e892-4876-8866-4b79bd7b4bf7';

export default class Api {
	//tested
	getAllProjects = async (company) => {
		const url = `${host}/projects?company=${company}`;
		try {
			const { data } = await get(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	//tested - catch not working
	upsertProject = async ({
		master,
		projectName,
		company,
		userStories,
		members,
		totalSprints,
		memberId,
	}) => {
		const url = `${host}/projects`;
		try {
			const { data } = await put(url, {
				master,
				projectName,
				company,
				userStories,
				members,
				totalSprints,
				memberId,
			});
			console.log(data);
			return data;
		} catch (e) {
			console.log(e);
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	getProjectById = async (id) => {
		const url = `${host}/projects/${id}`;
		try {
			const { data } = await get(url, {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	deleteProject = async (id,memId) => {
		const url = `${host}/projects/${id}/${memId}`;
		try {
			const { data } = await axios.delete(url,{
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	//In progress
	upsertStory = async ({
		createdBy,
		assignedTo,
		comments,
		createdAt,
		description,
		modifiedAt,
		priority,
		sprint,
		status,
		storyPoint,
		title,
		type,
		projectId,
		id,
	}) => {
		const url = `${host}/story`;
		try {
			const { data } = await put(url, {
				createdBy,
				assignedTo,
				comments,
				createdAt,
				description,
				modifiedAt,
				priority,
				sprint,
				status,
				storyPoint,
				title,
				type,
				projectId,
				id,
			});
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	//tested
	getStories = async (project, sprint) => {
		let url;
		if (project && !sprint) {
			url = `${host}/story?projectId=${project}`;
		} else if (project && sprint) {
			url = `${host}/story?projectId=${project}&sprint=${sprint}`;
		} else {
			url = `${host}/story`;
		}

		try {
			const { data } = await get(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	deleteStory = async (id) => {
		const url = `${host}/story/${id}`;
		try {
			const { data } = await axios.delete(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	getStoryById = async (id) => {
		const url = `${host}/story/${id}`;
		try {
			const { data } = await get(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	addComment = async (userId ,
		name ,
		comment,
		projectId ,
		storyId 
		) => {
		const url = `${host}/comment`;
		try {
			const { data } = await post(url, {
			  userId ,
              name ,
              comment,
              projectId ,
              storyId 
			});
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	getAllComments = async () => {
		const url = `${host}/comment`;
		try {
			const { data } = await get(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	getCommentById = async (id) => {
		const url = `${host}/comment/${id}`;
		try {
			const { data } = await get(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	updateComment = async (id, comment) => {
		const url = `${host}/comment`;
		try {
			const { data } = await patch(url, {
				id,
				comment,
			});
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	deleteComment = async (id) => {
		const url = `${host}/comment/${id}`;
		try {
			const { data } = await axios.delete(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	addUser = async (
		userId,
		email,
		isScrumMaster,
		userName,
		projects,
		company
	) => {
		const url = `${host}/`;
		try {
			const { data } = await post(
				url,
				{
					userId,
					email,
					isScrumMaster,
					userName,
					projects,
					company,
				},
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	getUserById = async (id) => {
		const url = `${host}/${id}`;
		try {
			const { data } = await get(url);
			console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

      updateUserById = async (id,email,isScrumMaster,userName,projects,company) => {
		const url = `${host}/${id}`;
		try {
			const { data } = await put(url,{
				email,
				isScrumMaster,
				userName,
				projects,
				company
			});
			console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	getCompany = async () => {
		const url = `${host}/company`;
		try {
			const { data } = await get(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	getCompanyById = async (id) => {
		const url = `${host}/company/${id}`;
		try {
			const { data } = await get(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	addCompany = async (companyName) => {
		const url = `${host}/company`;
		try {
			const { data } = await post(url, {
				companyName,
			});
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	updateCompany = async (id, companyName) => {
		const url = `${host}/company/${id}`;
		try {
			const { data } = await put(url, {
				id,
				companyName,
			});
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	getAllMembers = async (companyName,project) => {
		let url=`${host}/`;
		if(companyName && project.length === 0){
			 url = `${host}/?company=${companyName}`;
		}
		if(project && companyName.length === 0){
			 url = `${host}/?projectId=${project}`;
		}
		
		try {
			const { data } = await get(url);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};
}
