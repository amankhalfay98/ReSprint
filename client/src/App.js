import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Account from './components/Account';
import Home from './components/Home';
import Projects from './components/Projects';
import Backlog from './components/Backlog';
import Kanban from './components/Kanban2';
import Retrospective from './components/Retrospective';
import UserStories from './components/UserStories';
import individualUserStory from './components/IndividualUserStory';
//import Landing from './components/Landing';
import Navigation from './components/Navigation';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ReportIssue from './components/ReportIssue';
import Storyform from './components/storyform';
import Editform from './components/EditStory';
import { AuthProvider } from './firebase/Auth';
import NewProject from './components/NewProject';
import PrivateRoute from './components/PrivateRoute';
import Stats from './components/ProjectStats';
import EditProject from './components/EditProject';

//import EditProject from './components/EditProject'

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="App">
					<Navigation />
					<div className="App-body">
						<Route exact path="/" component={SignIn} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<PrivateRoute path="/home" component={Home} />
						<PrivateRoute path="/account" component={Account} />
						<PrivateRoute path="/projects" component={Projects} />
						<PrivateRoute path="/kanban" component={Kanban} />
						<PrivateRoute path="/backlog" component={Backlog} />
						<PrivateRoute path="/userstories" component={UserStories} />
						<PrivateRoute path="/retrospective" component={Retrospective} />
						<PrivateRoute path="/reportissue/:id" component={ReportIssue} />
						<PrivateRoute
							path="/individualUserStory"
							component={individualUserStory}
						/>
						<PrivateRoute path="/storyform" component={Storyform} />
						<PrivateRoute path="/editform" component={Editform} />
						<PrivateRoute path="/newproject" component={NewProject} />
						<PrivateRoute path="/editproject" component={EditProject} />
						<PrivateRoute path="/stats" component={Stats} />
						{/* <PrivateRoute path="/editproject" component={EditProject} /> */}
					</div>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
