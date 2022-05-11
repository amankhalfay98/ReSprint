import React, { useState, useEffect } from 'react';
import firebase from './Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log('This is the users uid: ', user.uid);
				console.log('This is the users email: ', user.email);
				console.log('This is the display name: ', user.displayName);
				console.log('This is the role: ', user.role);
				console.log(user);
			}

			// var findingAuth = firebaseApp.auth().currentUser.getIdToken();
			// if (findingAuth) {
			// 	console.log('this is the inside', findingAuth);
			// }

			setCurrentUser(user);
			setLoadingUser(false);
		});
	}, []);

	if (loadingUser) {
		return <div>Loading....</div>;
	}

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
