import React from 'react';
import axios from 'axios';
import {Card, Row, Icon, Button, Col} from 'react-materialize'


class TaskCard extends React.Component {
    constructor(props) {
         super(props);
         this.state = {taskData: {...this.props.taskData}};
    }

  render() {
    return (
        <Row>
            <Card className={this.state.deleted ? "grey-text red lighten-5" : "black-text red lighten-4"}>
                    <Col s={8}>
                        {this.state.taskData.taskContent}
                    </Col>
                    <Col s={2}>
                        <p>{this.state.taskData.workedTime} / {this.state.taskData.estimatedTime} </p>
                    </Col>

                    {
                        this.state.deleted ?
                        <Button waves='light' floating className="green lighten-3" onClick={this.restoreTask.bind(this)} icon="settings_backup_restore"/>

                        :
                        <div>
                            <Button waves='light' floating className="blue lighten-3" icon="play_arrow"/>
                            <Button  waves='light' floating className="red lighten-2" onClick={this.deleteTask.bind(this)} icon='delete_forever'/>
                        </div>
                    }

            </Card>
        </Row>
    );
  }

  restoreTask(e){
      axios({
           method: 'post',
           url: 'http://localhost:3000/api/addTask',
           data: this.state.taskData
      }).then(response => {
          if(response.data.isError){
              this.setState({...this.state, deleted: true, isError: response.data.isError});
          }else{
              this.setState({...this.state, deleted: false, isError: false})
          }
      });}

  deleteTask(e){
      e.preventDefault();

      axios({
           method: 'post',
           url: 'http://localhost:3000/api/removetask',
           data: {idTaskToRemove: this.state.taskData.idTask}
      }).then(response => {
          if(response.data.isError){
              this.setState({...this.state, deleted: false, isError: response.data.isError});
          }else{
              this.setState({...this.state, deleted: true, isError: false})
          }
      });
  }
}

export default TaskCard;
