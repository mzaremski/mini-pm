import React from 'react';
import {Row, Input, Button} from 'react-materialize'
import axios from 'axios';


class AddProjectPage extends React.Component {

    constructor(props) {
         super(props);

        this.state = {
            projectName: "",
            workedTime: "",
            estimatedTime: "",
            percentDone: "",
            responsiblePerson: "1",
            projectName: ""
        }
    }

    changeValue(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Add Project</h3>
                <form onSubmit={e => this.addProject(e)}>
                    <Row>
                		<Input
                            s={12}
                            value={this.state.projectName}
                            name="projectName"
                            onChange={e => this.changeValue(e)}
                            label="Project Name"
                        />
                    </Row>
                    <Row>
                        <Input
                            s={3}
                            value={this.state.workedTime}
                            name="workedTime"
                            onChange={e => this.changeValue(e)}
                            label="Worked Time"
                        />
                        <Input
                            s={3}
                            value={this.state.estimatedTime}
                            name="estimatedTime"
                            onChange={e => this.changeValue(e)}
                            label="Estimated Time"
                        />
                        <Input
                            s={3}
                            value={this.state.percentDone}
                            name="percentDone"
                            onChange={e => this.changeValue(e)}
                            label="Per cent done"
                        />
                        <Input
                            s={3}
                            value={this.state.responsiblePerson}
                            name="responsiblePerson"
                            onChange={e => this.changeValue(e)}
                            label="Responsible person"
                            disabled
                        />
                    </Row>

                    <label htmlFor="projectDescription">Project description</label>

                    <textarea
                        id="projectDescription"
                        className="materialize-textarea"
                        value={this.state.projectDescription}
                        name="projectDescription"
                        onChange={e => this.changeValue(e)}
                        label="Project description">
                    </textarea>

                    <Button large waves='light' className="red lighten-2" type="submit" icon="send"> Add Project</Button>

                    { this.state.isError ?  <div className="card-panel red">Error</div> : ""}
                </form>
            </div>
        );
    }

    addProject(e){
        e.preventDefault();

        axios({
             method: 'post',
             url: 'http://localhost:3000/api/addproject',
             data: this.state
        }).then(response => {
            if(response.data.isError){
                this.setState({...this.state, isError: response.data.isError});
            }else{
                this.state = {isError: false}
            }
        });
    }
}

export default AddProjectPage;
