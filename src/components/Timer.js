import React from 'react';
import {Button, CardPanel, Row} from 'react-materialize'
import Cookies from 'universal-cookie';
import axios from 'axios';

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {cookies : new Cookies()}

        const cookieTimerData = this.state.cookies.get('timerState');

        if(cookieTimerData){
            this.state = {
                ...this.state,
                timer:{...cookieTimerData}
            };
        }else{
            this.state = {
                ...this.state,
                timer : {
                    idTask : 12,//Id task for which the timer is active
                    wholeTime: 0,//whole timer time in milliseconds
                    runTime : false
                }
            };
            this.state.cookies.set('timerState', JSON.stringify(this.state.timer) , { path: '/' });
            console.log(this.state.cookies.get('timerState'))
        }

        this.startCookieCompatibility()
    }



    render() {
          return (
              <Row >
                  <CardPanel className="red lighten-5">

                    <Button icon="play_arrow" disabled={this.state.timer.runTime ? true : false} className="blue lighten-3" onClick={this.startTime.bind(this)}/>

                    <Button className="blue lighten-3" disabled={this.state.timer.runTime ? false : true} onClick={this.pauseTime.bind(this)} icon="pause"/>

                    <Button className="red lighten-3" disabled={!this.state.timer.runTime && (this.state.timer.wholeTime > 0) ? false : true} onClick={this.stopTime.bind(this)} icon="stop"/>

                    <strong> {this.secondsBeautifer(this.state.timer.wholeTime)}</strong>
                  </CardPanel>
              </Row>
          );
     }



     startTime(){
        console.log("Start Time")
        const cookieTimerData = this.state.cookies.get('timerState');
        var timer = cookieTimerData ? cookieTimerData : this.state.timer

        const stateToSave = {
            ...this.state,
            timer:{
                ...timer,
                runTime: true,
                timeStart: Date.now()
            }
        }

        this.setState(stateToSave)
        this.setTimerStateToCookie(stateToSave)
         //set to cookie time start in unix format
     }



     pauseTime(){//save whole time to state
         console.log("Pause Time")
         window.clearInterval(this.state.timeInterval);

         const cookieTimerData = this.state.cookies.get('timerState');
         const stateToSave = {
             ...this.state,
             timer:{
                 ...cookieTimerData,
                 runTime: false,
                 wholeTime:cookieTimerData.wholeTime + (Date.now() - cookieTimerData.timeStart)
             }
         }

         this.setState(stateToSave);
         this.setTimerStateToCookie(stateToSave)

     }



     stopTime(){//send ajax req to save whole time in the task
         console.log("Stop Time")
         var data = {wholeTime: this.state.timer.wholeTime}

         axios({
              method: 'post',
              url: 'http://localhost:3000/api/setTimeTask/12',
              data: data
         }).then(response => {
             if(response.data.isError){
                 alert("Save task time error");
             }else{

                 //reset data of timer
                 var stateTimer = {
                     ...this.state,
                     timer : {
                         idTask : false,
                         wholeTime: 0,
                         runTime : false
                     }
                 }
                this.setState(stateTimer)
                this.setTimerStateToCookie(stateTimer)
             }
         });

     }



     setTimerStateToCookie(state){
         state.cookies.set('timerState', JSON.stringify(state.timer) , { path: '/' });
     }



    startCookieCompatibility(){
        setInterval(()=> {
            var cookieTimerState = this.state.cookies.get("timerState")
            if(cookieTimerState.runTime){
                this.setState({...this.state, timer: {
                    ...cookieTimerState,
                    wholeTime: cookieTimerState.wholeTime + Math.round((Date.now() - cookieTimerState.timeStart))
                }})
            }else{
                this.setState({
                    ...this.state,
                    timer: {
                        ...cookieTimerState
                    }
                })
            }
        },1000)
    }



    //Convert seconds to HH:MM
     secondsBeautifer(totalMillisecond){
         let totalSeconds = Math.round(totalMillisecond/1000)
         const hours = Math.floor(totalSeconds / 3600);
         totalSeconds %= 3600;
         const minutes = Math.floor(totalSeconds/ 60);
         const seconds = totalSeconds%60

         return hours + " : "+ minutes + " : " + seconds
     }
}

export default Timer;
