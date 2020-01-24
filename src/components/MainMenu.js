import React, { Component } from 'react';

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
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
      //console.log(event.target.value);
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
  
    render() {
      let timer = this.state.timerSelected ? (
        <div>
          <br />
          <label>
            Seconds:
            <select name="timer" onChange={this.handleChange}>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45" selected>
                45
              </option>
              <option value="60">60</option>
            </select>
          </label>
        </div>
      ) : null;
  
      return (
        <div className="Centered">
          <form>
            <label>
              Enter Player Name:
              <input
                name="playername"
                type="text"
                value={this.state.playername}
                onChange={this.handleChange}
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
            {timer}
            <br />
            <label>Start Quiz:</label>
            <br />
            <label>
              <input
                name="startquiz"
                type="button"
                value="Start Quiz"
                onClick={this.startQuiz}
              />
            </label>
          </form>
        </div>
      );
    }
  }

export default MainMenu;
