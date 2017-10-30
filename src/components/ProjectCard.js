import React from 'react';
import { Link } from 'react-router-dom';
import {Row} from 'react-materialize'

class ProjectCard extends React.Component {
    render() {
        return (
            <Row>
                <Link to={'/project/' + this.props.projectData.idProject}>
                    <div className="black-text card-panel red lighten-4">
                        <ul className="row">
                            <li className="col s1"><strong>{this.props.projectData.idProject}.</strong></li>
                            <li className="col s7">{this.props.projectData.projectName}</li>
                            <li className="col s2">{this.props.projectData.percentDone}%</li>
                            <li className="col s2">{this.props.projectData.workedTime} / {this.props.projectData.estimatedTime}h</li>
                        </ul>
                    </div>
                </Link>
            </Row>
        );
    }
}

export default ProjectCard;
