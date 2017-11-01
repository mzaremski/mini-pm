import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import {Preloader, Row, Col, Card, Button, Icon} from 'react-materialize'
import TaskCard from '../TaskCard';
import TaskAddForm from '../Forms/TaskAddForm';


class Project extends React.Component {
    constructor(props) {
         super(props);
         this.state = {projectLoading: true, tasksLoading: true, formTaskIsShow: false};
    }

  render() {
    return (
        <div className="container">
            {this.state.projectLoading ?
            <Preloader size="big" color="red"></Preloader>
            :
            <div>
                <Row>
                    <Card className='black-text red lighten-4'>
                        <Row>
                            <Col s={11}>
                                <h3>{this.state.projectData.projectName}</h3>
                            </Col>
                            <Button floating large style={{"top":"15px"}} className='red lighten-4' waves='light' icon='more_vert'/>
                        </Row>
                        <Row>
                            <Col s={1}>{this.state.projectData.percentDone}%</Col>
                            <Col s={1}>{this.state.projectData.workedTime} / {this.state.projectData.estimatedTime}h</Col>
                        </Row>
                        <Row>
                            <Col s={12}>
                                {this.state.projectData.projectDesc}
                            </Col>
                        </Row>

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

            {this.state.formTaskIsShow ?
                <TaskAddForm addTask={this.addTask.bind(this)} closeForm={() => {this.setState({...this.state, formTaskIsShow: false})}}></TaskAddForm>
                :
                <Button floating large className='green lighten-3' waves='light' icon='add' onClick={ () => this.setState({...this.state, formTaskIsShow: true})} />
            }
        </div>
    );
  }

  getTasksComponents(state){
      var tasksComponents = []
      state.tasks.forEach(item => tasksComponents.push(this.getTaskCard(item)))

      return tasksComponents
  }

  getTaskCard(item){
      return <TaskCard taskData={{...item}}/>
  }

  addTask(taskData){
        taskData = {...taskData, parentId: this.state.projectData.idProject}

        axios({
           method: 'post',
           url: 'http://localhost:3000/api/addTask',
           data: taskData
        }).then(response => {
          if(response.data.isError){
              this.setState({...this.state, isError: response.data.isError});
          }else{
              taskData = {...taskData, idTask: response.data.rows.insertId}
              this.state.tasks.push(taskData);
              //console.log(response)
              this.setState({...this.state, isError: false, formTaskIsShow: false})
          }
        });
}

  componentWillMount() {
       axios.get(`http://localhost:3000/api/project/` + this.props.match.params.projectId).then(
           response => {
               this.setState({...this.state, projectData: response.data[0], projectLoading: false});
           }
       ).catch(error => console.log(error));

       axios.get(`http://localhost:3000/api/tasks/` + this.props.match.params.projectId).then(
           response => {
                   this.setState({...this.state, tasks: response.data, tasksLoading: false})
           }
        ).catch(function (error) {
           console.log(error);
        });
  }
}

export default Project;
