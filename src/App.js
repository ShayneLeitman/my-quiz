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
      totalQuestions: 5,
      count: 0,
      score: 0,
      sessionToken: "",
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
    this.renderSpecificPage = this.renderSpecificPage.bind(this);
    this.setAPIToken = this.setAPIToken.bind(this);

  }

  startQuiz(pname, numQ, time, timerselected) {
    if (timerselected) {
      this.setState({
        timer: time
      });
    } else {
      this.setState({
        timer: null
      });
    }
    this.setState({
      timerSelected: timerselected,
      playerName:pname,
      score: 0,
      totalQuestions: numQ,
      pageNum: 2,
    });
  }

  setAPIToken(apiToken) {
    this.setState({
      sessionToken: apiToken
    })  
  }

  playQuizAgain() {
    this.setState({
      pageNum: 2,
    });
  }

  viewResults(gameScore) {
    this.setState({
      score: gameScore,
      pageNum: 3,
    });

  }

  renderSpecificPage(pageNumber) {
    this.setState({
      pageNum: pageNumber,
    });
  }

  renderMainMenu() {
    return (
      <MainMenu startquiz={this.startQuiz}
      playername={this.state.playerName}
      totalquestions={this.state.totalQuestions}
      timer={this.state.timer}
      timerselected={this.state.timerSelected}
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
      token={this.state.sessionToken}
      settoken={this.setAPIToken}
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
        returntomainmenu={this.renderSpecificPage}
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
      <div className="test1">
      <div className="App">
        { this.renderSwitch() }
      </div>
      </div>
    );
  }
}

export default App;
