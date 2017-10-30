import React from 'react';
import axios from 'axios';
import ProjectCard from '../ProjectCard';
import {Preloader, Row, Col, Button} from 'react-materialize'
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
         super(props);
         this.state = {loading: true};
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={11}>
                        <h3>Project List</h3>
                    </Col>
                    <Col s={1}>
                        <Link to="/addproject">
                            <Button floating large style={{top:"10px"}} className='red lighten-2' waves='light' icon='+' />
                        </Link>

                    </Col>
                </Row>

                {this.state.loading ?
                    <Preloader size='big' color="red"/>
                    :
                    this.getProjectComponents(this.state)
                }
            </div>
        );
    }

    getProjectComponents(state){
        var projectComponents = []

        state.projects.forEach(function(item){
            projectComponents.push(<ProjectCard projectData={item}/>)
        });

        return projectComponents
    }

    componentWillMount() {
         //axios.get(`data/dataProjects.json`).then(
         axios.get(`http://localhost:3000/api/projects`).then(
             response => {
                 setTimeout.bind(window)(function(){
                     console.log("ZAPYTANIE WYKONANO POMYSLNIE")
                     this.state.loading = false;
                     this.setState({projects: response.data})
                 }.bind(this), 400)
             }
          ).catch(function (error) {
             console.log(error);
          });
    }
}

export default Home;


// GetProjectCard(props){
//     return <ProjectCard projectData={this.state[0]}></ProjectCard>
// }

// Object.keys(this.state).map(function(keyName, keyIndex) {
//     <ProjectCard projectData={this.state[keyName]}></ProjectCard>
// })
