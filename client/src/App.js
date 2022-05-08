import React from 'react';
// import logo from './img/tvm-header-logo.png';
import './App.css';
import Home from './components/Home';
import Projects from './components/Projects';
import Backlog from './components/Backlog';
import Kanban from './components/Kanban';
import Retrospective from './components/Retrospective';
import UserStories from './components/UserStories';
import NewProject from './components/NewProject';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          {/* <img src={logo} className='App-logo' alt='logo' /> */}
          <h1 className='App-title'>
            ReSprint
          </h1>
          <Link className='showlink' to='/'>
            Home
          </Link>
          <Link className='showlink' to='/projects'>
            Projects
          </Link>
          <Link className='showlink' to='/kanban'>
            Kanban
          </Link>
          <Link className='showlink' to='/backlog'>
            Backlog
          </Link>
          <Link className='showlink' to='/userstories'>
            UserStories
          </Link>
          <Link className='showlink' to='/retrospective'>
            Retrospective
          </Link>
        </header>
        <br />
        <br />
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/kanban' element={<Kanban />} />
            <Route path='/backlog' element={<Backlog />} />
            <Route path='/userstories' element={<UserStories />} />
            <Route path='/retrospective' element={<Retrospective />} />
            <Route path='/newproject' element={<NewProject />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;