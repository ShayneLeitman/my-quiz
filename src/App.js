import React, { Component } from 'react';
import './App.css';
import MainMenu from "./components/MainMenu"
import Quiz from "./components/Quiz"

class App extends Component {

  constructor() {
    super()

    this.state = {
      playerName:"",
      previousQuestions: [],
      curQuestion: "",
      curQuestionID: "",
      curOptions: [],
      curAnswer: "",
      totalQuestions: 0,
      count: 0,
      score: 0,
      sessionToken: null,
      firstGame: true,
      mainMenu: true,
      timerSelected: false,
      timer: null,

    }

    this.startQuiz = this.startQuiz.bind(this)
    this.renderMainMenu = this.renderMainMenu.bind(this)
    this.renderQuiz = this.renderQuiz.bind(this)
  }

//https://opentdb.com/api.php?amount=1&type=multiple

  startQuiz(pname, numQ, time) {
    this.setState({
      playerName:pname,
      mainMenu: false,
      totalQuestions: numQ
    });
    if (time !== null) {
      this.setState({
        timerSelected: true,
        timer: time
      });
    }
  }

  renderMainMenu() {
    return (
      <MainMenu startquiz={this.startQuiz}
      />
    )
  }

  renderQuiz() {
    return (
      <Quiz playername={this.state.playerName}
      time={this.state.timer}
      timerselected={this.state.timerSelected}
      totalquestions={this.state.totalQuestions}
      
      />
    )

  }

  render() {

    const screen = this.state.mainMenu ?
      this.renderMainMenu() : this.renderQuiz()
    
    return (
      <div className="App">
        { screen }
      </div>
    );
  }
}

export default App;
