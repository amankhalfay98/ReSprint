import axios, { post, get, put, patch } from 'axios';
//import { auth } from '../firebase/Firebase';

const host = 'http://resprint.herokuapp.com';
// Change token here
const token = '2bbbb2cb-e892-4876-8866-4b79bd7b4bf7';

export default class Api {
	//tested
	getAllProjects = async () => {
		const url = `${host}/projects`;
		try {
			const { data } = await get(url);
			//console.log(data);
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
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	deleteProject = async (id) => {
		const url = `${host}/projects/${id}`;
		try {
			const { data } = await axios.delete(url);
			//console.log(data);
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
		const url = `${host}`;
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
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	//tested
	getStories = async (project,sprint) => {
        let url;
        if(project && !(sprint)){
         url = `${host}/story?projectId=${project}`;
        }else if(project && sprint){
            url = `${host}/story?projectId=${project}&sprint=${sprint}`;
        }
        else{
            url = `${host}/story`;
        }
		
		try {
			const { data } = await get(url);
			//console.log(data);
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
			//console.log(data);
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
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	addComment = async (comment) => {
		const url = `${host}/comment`;
		try {
			const { data } = await post(url, {
				comment,
			});
			//console.log(data);
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
			//console.log(data);
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
			//console.log(data);
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
			//console.log(data);
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
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

	addUser = async (userId, email, isScrumMaster, userName, projects) => {
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
				},
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);
			//console.log(data);
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
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
	};

    getCompany = async()=>{
        const url = `${host}/company`;
		try {
			const { data } = await get(url);
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
    }

    getCompanyById = async (id) =>{
        const url = `${host}/company/${id}`;
		try {
			const { data } = await get(url);
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
    }

    addCompany = async (companyName) =>{
        const url = `${host}/company`;
		try {
			const { data } = await post(url, {
				companyName,
			});
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
    }

    updateCompany = async (id,companyName)=>{
        const url = `${host}/company/${id}`;
		try {
			const { data } = await put(url, {
                id,
				companyName,
			});
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}

    }

    getAllMembers = async (companyName)=>{
        const url = `${host}/?company=${companyName}`;
		try {
			const { data } = await get(url);
			//console.log(data);
			return data;
		} catch (e) {
			if (e.response?.data?.message) {
				throw new Error(e.response?.data.message);
			}
			throw new Error(e.message);
		}
    }

}
