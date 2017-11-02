import React from 'react';
import {Icon, Button, CardPanel, Row} from 'react-materialize'
import { Cookies } from 'react-cookie';

class Timer extends React.Component {
    constructor(props) {
         super(props);
         this.state = {}
         this.state.timer = {
             currentTime: '0',
             runTime : false
         }
    }
    render() {
          return (
              <Row >
                  <CardPanel offset="s"className="red lighten-5">
                      <Button className="blue lighten-3" onClick={this.startTime.bind(this)}>
                          <Icon medium>play_arrow</Icon>
                      </Button>
                      {this.state.timer.runTime ?
                          <Button className="blue lighten-3" onClick={this.pauseTime.bind(this)}><Icon medium>pause</Icon></Button>
                          :
                          <Button className="red lighten-3" onClick={this.stopTime.bind(this)}><Icon medium>stop</Icon></Button>
                      }

                      <strong>1h 20min</strong>
                  </CardPanel>
              </Row>
          );
     }

     startTime(){
         console.log("Start Time")
         this.setState({...this.state, timer: {...this.state.timer, runTime: true}})
         console.log(this.state.timer)
         //set to cookie time start in unix format
     }

     pauseTime(){
         console.log("Pause Time")
         this.setState({...this.state, timer: {...this.state.timer, runTime: false}})
         //(get current time in unix format) - (get from cookie start time)
     }

     stopTime(){
        console.log("Stop Time")
         //send ajax req with whole time
     }


}

export default Timer;
