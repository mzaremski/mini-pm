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
                            <Button floating large style={{top:"10px"}} className='red lighten-2' waves='light' icon='add' />
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
        const projectComponents = []
        state.projects.forEach(item => projectComponents.push(<ProjectCard projectData={item}/>));
        return projectComponents
    }

    componentWillMount() {
         //axios.get(`data/dataProjects.json`).then(
         axios.get(`http://localhost:3000/api/projects`).then(
             response => {
                     console.log("ZAPYTANIE WYKONANO POMYSLNIE")
                     this.state.loading = false;
                     this.setState({projects: response.data})
             }
         ).catch(error => console.log(error));
    }
}

export default Home;
