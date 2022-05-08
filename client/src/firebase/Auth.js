import React, { useState, useEffect } from 'react';
import firebaseApp from './Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true);

	useEffect(() => {
		firebaseApp.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log('This is the users uid: ', user.uid);
				console.log('This is the users email: ', user.email);
				console.log('This is the display name: ', user.displayName);
				console.log('This is the role: ', user.role);
				console.log(user);
			}

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
