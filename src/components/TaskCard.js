import React from 'react';
import {Card, Row} from 'react-materialize'


class TaskCard extends React.Component {

  render() {
    return (
        <Row>
            <Card className='black-text red lighten-4'>
                {this.props.taskData.taskName}
            </Card>
        </Row>
    );
  }
}

export default TaskCard;
