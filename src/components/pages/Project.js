import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import {Preloader, Row, Col, Card} from 'react-materialize'
import TaskCard from '../TaskCard';


class Project extends React.Component {
    constructor(props) {
         super(props);
         this.state = {projectLoading: true, tasksLoading: true};
    }

  render() {
    return (
        <div className="container">
            {this.state.projectLoading ?
            <Preloader size="big" color="red"></Preloader>
            :
            <div>
                <Row>
                    <Card className='black-text red lighten-4' title={this.state.projectData.projectName}>
                        <ul className="row">
                            <li className="col s2">{this.state.projectData.percentDone}%</li>
                            <li className="col s2">{this.state.projectData.workedTime} / {this.state.projectData.estimatedTime}h</li>
                        </ul>
                        <p>
                            {this.state.projectData.projectDesc}
                        </p>
                    </Card>
                </Row>
            </div>
            }

            {this.state.tasksLoading ?
                <Preloader size="small" color="red"></Preloader>
                :
                // Object.keys(this.state.tasks).map(function(keyName) {
                //    return <TaskCard taskData={this.state.tasks[keyName]} />
                // }.bind(this))
                 this.getTasksComponents(this.state)
            }
        </div>
    );
  }

  getTasksComponents(state){
      var tasksComponents = []
      state.tasks.forEach(function(item){
          tasksComponents.push(<TaskCard taskData={item}/>)
      })

      return tasksComponents
  }

  componentWillMount() {
       axios.get(`http://localhost:3000/api/project/` + this.props.match.params.projectId).then(
           response => {
               setTimeout.bind(window)(function(){
                   this.setState({...this.state, projectData: response.data[0], projectLoading: false});
                   console.log(this.state)
               }.bind(this), 400)
           }
        ).catch(function (error) {
           console.log(error);
        });

       axios.get(`http://localhost:3000/api/tasks/` + this.props.match.params.projectId).then(
           response => {
               setTimeout.bind(window)(function(){
                   this.setState({...this.state, tasks: response.data, tasksLoading: false})
                   console.log(this.state)
               }.bind(this), 100)
           }
        ).catch(function (error) {
           console.log(error);
        });
  }
}

export default Project;
