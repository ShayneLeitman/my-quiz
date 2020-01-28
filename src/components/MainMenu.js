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
        timer: null
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleCheckChange = this.handleCheckChange.bind(this);
      this.startQuiz = this.startQuiz.bind(this);
      this.renderTimerOption = this.renderTimerOption.bind(this);
      this.renderTimerOption2 = this.renderTimerOption2.bind(this);
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    handleCheckChange() {
      if (!this.state.timerSelected) {
        this.setState((prevState, props) => ({
          timerSelected: !prevState.timerSelected,
          timer: "45"
        }));
      } else {
        this.setState((prevState, props) => ({
          timerSelected: !prevState.timerSelected,
          timer: null
        }));
      }
    }

    startQuiz() {
        //console.log(this.state.timer)
        this.props.startquiz(this.state.playername,
            this.state.numQuestions, this.state.timer)
    }

    renderTimerOption2() {
      return (
        this.state.timerSelected ? (
          <div className="timer-options" >
            <label>
              Seconds:
              <select name="timer"
              defaultValue="45"
              onChange={this.handleChange}
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
              </select>
            </label>
          </div>
        ) : null
      )
    }

    renderTimerOption() {
      return (
          <div className={this.state.timerSelected ?
          "timer-options-yes" : "timer-options-no"} >
            <label>
              Seconds:
              <select name="timer"
              defaultValue="45"
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
          <Jumbotron fluid className="jumbotron-main-menu">
          <h1>Welcome to the quiz app!</h1>
          <p>
            This is a simple quiz app that takes it's questions from
             an online question database that was made available for free use!
          </p>
          </Jumbotron>
          <div className="main-menu-form">
            <form>
              <label>
                Enter Player Name:
                <input
                  name="playername"
                  type="text"
                  value={this.state.playername}
                  onChange={this.handleChange}
                  placeholder="Enter Player Name"
                />
              </label>
              <br />
              <label>
                Enter number of questions you would like:
                <input
                  name="numQuestions"
                  type="number"
                  min="1"
                  max="20"
                  defaultValue={this.state.numQuestions}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Check this box to enable the timer:
                <input
                  name="timerSelected"
                  type="checkbox"
                  checked={this.state.timerSelected}
                  onChange={this.handleCheckChange}
                />
              </label>
              {this.renderTimerOption()}
              <br />
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
