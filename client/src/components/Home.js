import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';

const Home = () => {
	const { currentUser } = useContext(AuthContext);
	console.log('This is coming from the Home Component: ', currentUser.uid);
	return (
		<div>
			<p>
				This is a simple example of using React to Query the TV Maze API. Start
				by clicking the "Shows" button above
			</p>

			<p>
				The application queries two of TV Maze's end-points:{' '}
				<a
					rel="noopener noreferrer"
					target="_blank"
					href="http://api.tvmaze.com/shows"
				>
					http://api.tvmaze.com/shows
				</a>{' '}
				and{' '}
				<a
					rel="noopener noreferrer"
					target="_blank"
					href="http://api.tvmaze.com/search/shows?q=SEARCH_TERM"
				>
					http://api.tvmaze.com/search/shows?q=SEARCH_TERM
				</a>{' '}
				for searching the shows in the API (Where SEARCH_TERM is what the user
				types into the search input)
			</p>
		</div>
	);
};

export default Home;
