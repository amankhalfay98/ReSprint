import React from 'react';
// import logo from './img/tvm-header-logo.png';
import './App.css';
import Home from './components/Home';
import Projects from './components/Projects';
import Backlog from './components/Backlog';
import Kanban from './components/Kanban';
import Retrospective from './components/Retrospective';
import UserStories from './components/UserStories';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navigation from './components/Navigation';
import Account from './components/Account';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div className="App">
					<header className="App-header">
						{/* <img src={logo} className='App-logo' alt='logo' /> */}
						<h1 className="App-title">ReSprint</h1>
						{/* <Link className="showlink" to="/">
							Home
						</Link>
						<Link className="showlink" to="/projects">
							Projects
						</Link>
						<Link className="showlink" to="/kanban">
							Kanban
						</Link>
						<Link className="showlink" to="/backlog">
							Backlog
						</Link>
						<Link className="showlink" to="/userstories">
							UserStories
						</Link>
						<Link className="showlink" to="/retrospective">
							Retrospective
						</Link> */}
						<Navigation />
					</header>
					<br />
					<br />
					<div className="App-body">
						<Routes>
							<Route path="/" element={<Home />} />
							<PrivateRoute path="/account" element={<Account />} />
							<PrivateRoute path="/projects" element={<Projects />} />
							<PrivateRoute path="/kanban" element={<Kanban />} />
							<PrivateRoute path="/backlog" element={<Backlog />} />
							<PrivateRoute path="/userstories" element={<UserStories />} />
							<PrivateRoute path="/retrospective" element={<Retrospective />} />
							<Route path="/signin" element={<SignIn />} />
							<Route path="/signup" element={<SignUp />} />
						</Routes>
					</div>
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
