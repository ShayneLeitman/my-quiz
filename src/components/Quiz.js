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
            playerAnswer: "",
            curQuestionNum: 0,
        }

        this.getNewQuestion = this.getNewQuestion.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.randomizeArray = this.randomizeArray.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.renderAnswerOptions = this.renderAnswerOptions.bind(this);
        this.updatePlayerAnswer = this.updatePlayerAnswer.bind(this);

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

    getNewQuestion() {
        var self = this;
        var getQuestion = "https://opentdb.com/api.php?amount=1"
        getQuestion += "&token=" + this.state.curToken
            axios.get(getQuestion)
            .then(function (response) {
                let optionsArray = response.data.results[0].incorrect_answers
                optionsArray.push(response.data.results[0].correct_answer)
                let newArr = self.randomizeArray(optionsArray)
                let curquestion = response.data.results[0].question
                self.setState((prevState, props) => ({
                    curQuestion: curquestion,
                    curOptions: newArr,
                    curQuestionNum: prevState.curQuestionNum + 1
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

    renderAnswerOptions() {
        const answercomponents = this.state.curOptions.map((option) =>
            <AnswerOption
            curoption={option} 
            playeranswer={this.state.playerAnswer}
            updateanswer={this.updatePlayerAnswer}
            answer={this.state.curAnswer}
            />

        )
        return (
            <div className="answer-options">
                <ul className="answer-options-list">
                { answercomponents }
                </ul>
            </div>
        )      
    }

    render() {
        return(
            <div>
                <InQuizHeader playername={this.props.playername}
                curQuestionNum={this.state.curQuestionNum}
                totalquestions={this.props.totalquestions}
                />

                 {this.renderQuestion() }

                { this.renderAnswerOptions() }

            </div>
        )
    }

}

export default Quiz;