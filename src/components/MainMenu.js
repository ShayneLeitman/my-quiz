import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Button } from 'react-bootstrap';

class MainMenu extends Component {
    constructor() {
      super();
  
      this.state = {
        playername: "",
        numQuestions: 5,
        timerSelected: false,
        timer: null,
        storedTimer: null
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleCheckChange = this.handleCheckChange.bind(this);
      this.startQuiz = this.startQuiz.bind(this);
      this.renderTimerOption = this.renderTimerOption.bind(this);
    }

    componentDidMount() {
      this.setState({
        playername: this.props.playername,
        numQuestions: this.props.totalquestions,
        timerSelected: this.props.timerselected,
        timer: this.props.timer,
        storedTimer: this.props.timer,
      })
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    handleCheckChange() {
      if (!this.state.timerSelected) {
        let tmp = (this.state.storedTimer == null) 
          ? "30" : this.state.storedTimer
        this.setState((prevState, props) => ({
          timerSelected: !prevState.timerSelected,
          timer: tmp
        }));
      } else {
        this.setState((prevState, props) => ({
          timerSelected: !prevState.timerSelected,
          timer: null,
          storedTimer: prevState.timer,
        }));
      }
    }

    startQuiz() {
        this.props.startquiz(this.state.playername,
            this.state.numQuestions, this.state.timer, this.state.timerSelected)
    }

    renderTimerOption() {
      return (
          <div className={this.state.timerSelected ?
          "timer-options-yes" : "timer-options-no"} >
            <label>
              Seconds:
              <select 
              className="mm-timer-options"
              name="timer"
              defaultValue={this.props.timerselected ? this.props.timer : "30"}
              onChange={this.handleChange}
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
              </select>
            </label>
          </div>
      )
    }
  
    render() {
  
      return (
        <div className="main-menu">
          <div className="jumbotron-main-menu">
          <h1>Welcome to the quiz app!</h1>
          <p>
            This is a simple quiz app that takes it's questions from
             an online question database that was made available for free use!
          </p>
          </div>
          <div className="main-menu-form">
            <form>
              <label>
                Enter Player Name:
                <input
                className="mm-pname-tb"
                  name="playername"
                  type="text"
                  defaultValue={this.state.playername}
                  onChange={this.handleChange}
                  placeholder="Enter Player Name"
                />
              </label>
              <br />
              <label>
                Enter number of questions you would like:
                <input
                className="mm-numq-number"
                  name="numQuestions"
                  type="number"
                  min="1"
                  max="20"
                  defaultValue={this.props.totalquestions}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label className="timer-checkbox">   
                Enable Timer:
                <input
                className="mm-timer-checkbox"
                  name="timerSelected"
                  type="checkbox"
                  checked={this.state.timerSelected}
                  onChange={this.handleCheckChange}
                />
              </label>
              {this.renderTimerOption()}
              <br />
              <label>
                <button
                  name="startquiz"
                  className="start-quiz-btn"
                  type="button"
                  onClick={this.startQuiz}
                >
                    Start Quiz
                </button>
              </label>
            </form>
          </div>
        </div>
      );
    }
  }

export default MainMenu;
