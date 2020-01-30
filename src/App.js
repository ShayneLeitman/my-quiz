import React, { Component } from 'react';
import './App.css';
import MainMenu from "./components/MainMenu"
import Quiz from "./components/Quiz"
import Results from "./components//Results"

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
      pageNum: 1,

    }

    this.startQuiz = this.startQuiz.bind(this);
    this.renderMainMenu = this.renderMainMenu.bind(this);
    this.renderQuiz = this.renderQuiz.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
    this.viewResults = this.viewResults.bind(this);
    this.playQuizAgain = this.playQuizAgain.bind(this);

  }

//https://opentdb.com/api.php?amount=1&type=multiple

  startQuiz(pname, numQ, time) {
    if (time !== null) {
      this.setState({
        timerSelected: true,
        timer: time
      });
    }
    this.setState({
      playerName:pname,
      score: 0,
      mainMenu: false,
      totalQuestions: numQ,
      pageNum: 2,
    });
  }

  playQuizAgain() {
    this.setState({
      score: 0,
      pageNum: 2,
    });
  }

  viewResults(gameScore) {
    this.setState({
      score: gameScore,
      pageNum: 3,
    });

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
      viewresults={this.viewResults}
      />
    )
  }

  renderResults() {
      return (
        <Results 
        score={this.state.score}
        playername={this.state.playerName}
        totalquestions={this.state.totalQuestions}
        playquizagain={this.playQuizAgain}
        />
      )
  }

  renderSwitch() {
    switch(this.state.pageNum) {
      case 1:
        return this.renderMainMenu()
      
      case 2:
        return this.renderQuiz()

      case 3:
        return this.renderResults()
    }
  }

  render() {

    const screen = this.state.mainMenu ?
      this.renderMainMenu() : this.renderQuiz()
    


    return (
      <div className="App">
        { this.renderSwitch() }
      </div>
    );
  }
}

export default App;
