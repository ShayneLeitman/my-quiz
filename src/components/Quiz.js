import React, { Component } from 'react';
import axios from "axios"
import InQuizHeader from "./InQuizHeader"
import Question from "./Question"
import AnswerOption from "./AnswerOption"

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
        }

        this.getNewQuestion = this.getNewQuestion.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.randomizeArray = this.randomizeArray.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.renderAnswerOptions = this.renderAnswerOptions.bind(this);
        this.updatePlayerAnswer = this.updatePlayerAnswer.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.renderNextQButton = this.renderNextQButton.bind(this);

    }

    async componentDidMount() {
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
            console.log(curquestion)
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

    renderSubmitButton() {
        return (
            
                <button
                type="button"
                className="submit-answer-btn"
                onClick={() => this.setState(
                    {questionInProgress: false})}
                disabled={!this.state.questionInProgress
                    || this.state.playerAnswer === ""}
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
                onClick={() => this.setState(
                    {questionInProgress: true})}
                disabled={this.state.questionInProgress}
                >
                    {(this.props.totalquestions !== this.state.curQuestionNum)
                    ? "Next" : "View Results"
                    }
                </button>
            
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
        return(
            <div className="quiz" >

                <InQuizHeader playername={this.props.playername}
                curQuestionNum={this.state.curQuestionNum}
                totalquestions={this.props.totalquestions}
                />

                { this.renderQuestion() }
                <div>
                    { this.renderAnswerOptions() }
                </div>
                <div className="quiz-submit-results-btn">
                    { this.renderSubmitButton() }
                </div>
            </div>
        )
    }

}

export default Quiz;