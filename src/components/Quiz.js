import React, { Component } from 'react';
import axios from "axios"
import InQuizHeader from "./InQuizHeader"
import Question from "./Question"
import AnswerOption from "./AnswerOption"
import Timer from "./Timer"

class Quiz extends Component {

    constructor() {
        super()

        this.state = {
            curToken:"",
            previousQuestions: [],
            curQuestion: "",
            curQuestionID: "",
            curOptions: [],
            curAnswer: null,
            qAnswer: "",
            playerAnswer: "",
            curQuestionNum: 0,
            questionInProgress: false,
            //timerSelected: false,
            timer: null,
        }

        this.getNewQuestion = this.getNewQuestion.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.randomizeArray = this.randomizeArray.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.renderAnswerOptions = this.renderAnswerOptions.bind(this);
        this.updatePlayerAnswer = this.updatePlayerAnswer.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.renderNextQButton = this.renderNextQButton.bind(this);
        this.nextQuestionOrResults = this.nextQuestionOrResults.bind(this);
        this.handleTimer = this.handleTimer.bind(this);
        this.renderTimer = this.renderTimer.bind(this);

    }

    async componentDidMount() {
        this.setState({
            timer: this.props.time,
            //timerSelected: this.props.timerselected
        })
        var self = this;
        if (this.state.curToken === "") {
            const getTokenURL = "https://opentdb.com/api_token.php?command=request";
            await axios.get(getTokenURL)
            .then(function (response) {
              self.setState({
                    curToken: response.data.token
                })
            })
            .catch(function (error) {
              console.log(error);
            })
        }
        this.getNewQuestion()
    }

    async getNewQuestion() {
        var self = this;
        var getQuestion = "https://opentdb.com/api.php?amount=1"
        getQuestion += "&token=" + this.state.curToken
        await axios.get(getQuestion)
        .then(function (response) {
            let optionsArray = response.data.results[0].incorrect_answers
            optionsArray.push(response.data.results[0].correct_answer)
            let newArr = self.randomizeArray(optionsArray)
            let curquestion = response.data.results[0].question
            //console.log(curquestion)
            self.setState((prevState, props) => ({
                qAnswer: response.data.results[0].correct_answer,
                curQuestion: curquestion.replace(/&quot;/g, '"'),
                curOptions: newArr,
                curQuestionNum: prevState.curQuestionNum + 1,
                playerAnswer: "",
                questionInProgress: true
            }));
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    randomizeArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    checkAnswer() {

    }

    handleTimer() {

    }

    renderQuestion() {
        return (
                <Question
                curquestion={ this.state.curQuestion }
                />
        )
    }

    updatePlayerAnswer(answer) {
        this.setState({
            playerAnswer: answer
        })
    }

    nextQuestionOrResults() {
        if (this.state.curQuestionNum != this.props.totalquestions) {
            this.getNewQuestion()
        } else {

        }
    }

    renderSubmitButton() {
        return (
            
                <button
                type="button"
                className="submit-answer-btn"
                onClick={() => this.setState(
                    {questionInProgress: false})}
                //disabled={!this.state.questionInProgress
                    //|| this.state.playerAnswer === ""}
                >
                Submit
                </button>
            
        )
    }

    renderNextQButton() {
        return (
            
                <button
                type="button"
                className={(this.props.totalquestions === this.state.curQuestionNum)
                    ? "view-results-btn" : "next-question-btn"
                }
                onClick={this.nextQuestionOrResults}
                >
                    {(this.props.totalquestions != this.state.curQuestionNum)
                    ? "Next" : "View Results"
                    }
                </button>
            
        )
    }

    renderTimer() {
        return (
            this.props.timerselected ? 
            <Timer 
            startTime={this.state.timer}
            />
            : null
        )
    }

    renderAnswerOptions() {
        const answercomponents = this.state.curOptions.map((option) =>
            <AnswerOption
            key={option}
            curoption={option}
            playeranswer={this.state.playerAnswer}
            updateanswer={this.updatePlayerAnswer}
            answer={this.state.curAnswer}
            questioninprogress={this.state.questionInProgress}
            />

        )
        return (
            <div className="answer-options">
                { answercomponents }
            </div>
        )      
    }

    render() {

        const submitOrResultsBtn = (this.state.questionInProgress)
            ? this.renderSubmitButton() : this.renderNextQButton()

        return(
            <div className="quiz" >

                <InQuizHeader playername={this.props.playername}
                curQuestionNum={this.state.curQuestionNum}
                totalquestions={this.props.totalquestions}
                />

                { this.renderQuestion() }

                { this.renderTimer() }

                <div>
                    { this.renderAnswerOptions() }
                </div>
                <div className="quiz-submit-results-btn">
                    { submitOrResultsBtn }
                </div>
            </div>
        )
    }

}

export default Quiz;