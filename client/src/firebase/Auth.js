import React, { useState, useEffect } from 'react';
import firebase from './Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true);

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
			}
			setLoadingUser(false);
		});
		return unsubscribe;
	}, []);

	if (loadingUser) {
		return <div>Loading....</div>;
	}

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{!loadingUser && children}
		</AuthContext.Provider>
	);
};
