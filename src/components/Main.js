import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Project from './pages/Project';
import AddProjectPage from './pages/AddProjectPage';
import Timer from './Timer';
import {Navbar, NavItem, Icon, Row} from 'react-materialize'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class MainApp extends React.Component {
  render() {
      return (
        <Router>
            <div>
                <Navbar brand='MiniPM' right></Navbar>

                <Row>
                    <Timer></Timer>
                </Row>

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
