import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';
import googleSignUpLogo from '../imgs/google.png';

const SocialSignIn = () => {
	const socialSignOn = async (provider) => {
		try {
			await doSocialSignIn(provider);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div>
			<img
				onClick={() => socialSignOn('google')}
				alt="google signin"
				src={googleSignUpLogo}
			/>
		</div>
	);
};

export default SocialSignIn;
