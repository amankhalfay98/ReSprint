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
	getStories = async () => {
		const url = `${host}/story`;
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

	//   health = async () => {
	//     const url = `${this.host}/categories`;
	//     try {
	//       await get(url);
	//       return true;
	//     } catch (e) {
	//       return false;
	//     }
	//   };

	//   signUp = async ({ name, email, password }) => {
	//     const url = `${this.host}/register`;
	//     try {
	//       const { data } = await post(url, {
	//         name,
	//         email,
	//         password,
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   verify = async ({ email, verificationCode }) => {
	//     const url = `${this.host}/register/verify`;
	//     try {
	//       const { data } = await post(url, {
	//         email,
	//         verificationCode,
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   login = async ({ email, password }) => {
	//     const url = `${this.host}/login`;
	//     try {
	//       const { data } = await post(url, {
	//         email,
	//         password,
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   me = async () => {
	//     const url = `${this.host}/me`;
	//     try {
	//       const { data } = await get(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   updateMe = async ({ name, password }) => {
	//     const url = `${this.host}/me`;
	//     try {
	//       const { data } = await put(
	//         url,
	//         {
	//           name,
	//           password,
	//         },
	//         {
	//           headers: {
	//             authorization: `Bearer ${this.token}`,
	//           },
	//         },
	//       );
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   forgot = async ({ email }) => {
	//     const url = `${this.host}/forgot`;
	//     try {
	//       const { data } = await post(url, {
	//         email,
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   getCategories = async () => {
	//     const url = `${this.host}/categories`;
	//     try {
	//       const { data } = await get(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   upsertProduct = async ({ barcode }) => {
	//     const url = `${this.host}/products`;

	//     try {
	//       const { data } = await put(
	//         url,
	//         {
	//           barcode,
	//         },
	//         {
	//           headers: {
	//             authorization: `Bearer ${this.token}`,
	//           },
	//         },
	//       );
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   getProducts = async () => {
	//     const url = `${this.host}/products`;
	//     try {
	//       const { data } = await get(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   upsertCustomProduct = async ({
	//     barcode,
	//     name,
	//     alias,
	//     description,
	//     brand,
	//     manufacturer,
	//     categoryId,
	//   }) => {
	//     const url = `${this.host}/products/custom`;
	//     try {
	//       const { data } = await put(
	//         url,
	//         {
	//           barcode,
	//           name,
	//           alias,
	//           description,
	//           brand,
	//           manufacturer,
	//           categoryId,
	//         },
	//         {
	//           headers: {
	//             authorization: `Bearer ${this.token}`,
	//           },
	//         },
	//       );
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   addItem = async ({ productId, expirationDate, quantity, cost }) => {
	//     const url = `${this.host}/products/${productId}`;
	//     try {
	//       const { data } = await post(
	//         url,
	//         {
	//           expirationDate,
	//           quantity,
	//           cost,
	//         },
	//         {
	//           headers: {
	//             authorization: `Bearer ${this.token}`,
	//           },
	//         },
	//       );
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   updateProduct = async ({
	//     productId,
	//     barcode,
	//     name,
	//     alias,
	//     description,
	//     brand,
	//     manufacturer,
	//     categoryId,
	//   }) => {
	//     const url = `${this.host}/products/${productId}`;
	//     try {
	//       const { data } = await put(
	//         url,
	//         {
	//           barcode,
	//           name,
	//           alias,
	//           description,
	//           brand,
	//           manufacturer,
	//           categoryId,
	//         },
	//         {
	//           headers: {
	//             authorization: `Bearer ${this.token}`,
	//           },
	//         },
	//       );
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   getProduct = async ({ id }) => {
	//     const url = `${this.host}/products/${id}`;
	//     try {
	//       const { data } = await get(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   deleteProduct = async ({ id }) => {
	//     const url = `${this.host}/products/${id}`;
	//     try {
	//       const { data } = await axios.delete(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   getItems = async () => {
	//     const url = `${this.host}/items`;
	//     try {
	//       const { data } = await get(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   updateItem = async ({
	//     itemId,
	//     expirationDate,
	//     initialQuantity,
	//     quantity,
	//     cost,
	//     isUsed,
	//     isExpired,
	//   }) => {
	//     console.log(`Update item body`);
	//     console.log({
	//       itemId,
	//       expirationDate,
	//       initialQuantity,
	//       quantity,
	//       cost,
	//       isUsed,
	//       isExpired,
	//     });
	//     const url = `${this.host}/items/${itemId}`;
	//     try {
	//       const { data } = await put(
	//         url,
	//         {
	//           expirationDate,
	//           initialQuantity,
	//           quantity,
	//           cost,
	//           isUsed,
	//           isExpired,
	//         },
	//         {
	//           headers: {
	//             authorization: `Bearer ${this.token}`,
	//           },
	//         },
	//       );
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   getItem = async ({ id }) => {
	//     const url = `${this.host}/items/${id}`;
	//     try {
	//       const { data } = await get(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   deleteItem = async ({ id }) => {
	//     const url = `${this.host}/items/${id}`;
	//     try {
	//       const { data } = await axios.delete(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   addItemToShopping = async ({ productId, quantity, cost }) => {
	//     const url = `${this.host}/shopping`;
	//     try {
	//       const { data } = await post(
	//         url,
	//         {
	//           productId,
	//           quantity,
	//           cost,
	//         },
	//         {
	//           headers: {
	//             authorization: `Bearer ${this.token}`,
	//           },
	//         },
	//       );
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   getShopping = async () => {
	//     const url = `${this.host}/shopping`;
	//     try {
	//       const { data } = await get(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   updateShopping = async ({ itemId, quantity, cost }) => {
	//     const url = `${this.host}/shopping/${itemId}`;
	//     try {
	//       const { data } = await put(
	//         url,
	//         {
	//           quantity,
	//           cost,
	//         },
	//         {
	//           headers: {
	//             authorization: `Bearer ${this.token}`,
	//           },
	//         },
	//       );
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   getShoppingItem = async ({ id }) => {
	//     const url = `${this.host}/shopping/${id}`;
	//     try {
	//       const { data } = await get(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };

	//   deleteShoppingItem = async ({ id }) => {
	//     const url = `${this.host}/shopping/${id}`;
	//     try {
	//       const { data } = await axios.delete(url, {
	//         headers: {
	//           authorization: `Bearer ${this.token}`,
	//         },
	//       });
	//       return data;
	//     } catch (e) {
	//       if (e.response?.data?.message) {
	//         throw new Error(e.response?.data.message);
	//       }
	//       throw new Error(e.message);
	//     }
	//   };
}
