import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Project from './pages/Project';
import AddProjectPage from './pages/AddProjectPage';
import {Navbar, NavItem, Icon} from 'react-materialize'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class MainApp extends React.Component {
  render() {
      return (
        <Router>
            <div>
                <Navbar brand='MiniPM' right>
                	<NavItem href='/'><Icon>home</Icon></NavItem>
                	<NavItem href='/login'>Login</NavItem>
                </Navbar>

                <Route path="/login" component={Login} />
                <Route path="/addproject" component={AddProjectPage} />

                <Route exact path="/" component={Home} />
                <Route path="/project/:projectId" component={Project}/>
            </div>
        </Router>
      );
  }
}

export default MainApp;
