import React from 'react';
import axios from 'axios';
import {Card, Button, Input, Row} from 'react-materialize'


class TaskAddForm extends React.Component {
    constructor(props) {
         super(props);
         this.state = {taskData: {...this.props.taskData}};
    }

  render() {
        return (
            <Row >
                <Card style={{"paddingBottom":"30px"}} className="red lighten-5">
                    <form onSubmit={e =>{ e.preventDefault(); this.props.addTask(this.state.taskData)}}>
                        <Button onClick={this.props.closeForm} style={{top:"15px"}} waves='light' floating className="grey" icon="close"></Button>
                        <Input s={7} onChange={e => this.changeValue(e)} name="taskContent" label="Task Content" />
                        <Input s={2} onChange={e => this.changeValue(e)} name="workedTime" label="Worked Time" />
                        <Input s={2} onChange={e => this.changeValue(e)} name="estimatedTime" label="Estimated Time" />
                        <Button type="submit" style={{top:"15px"}} waves='light' floating className="green lighten-3" icon="send"/>
                    </form>
                </Card>
            </Row>
        );
   }


   changeValue(e){
       this.setState({
           ...this.state,
           taskData: {...this.state.taskData, [e.target.name]: e.target.value}
       })
   }


   setDataTask(e){
       e.preventDefault();
   }
 }


export default TaskAddForm;
