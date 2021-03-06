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
            allQuestionData: null,
            curToken:"",
            curQuestion: "",
            curOptions: [],
            curAnswer: null,
            curScore: 0,
            qAnswer: "",
            playerAnswer: "",
            curQuestionNum: 1,
            questionInProgress: false,
            curTimer: null,
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
        this.timerCountDown = this.timerCountDown.bind(this);
        this.renderTimer = this.renderTimer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.getQuestionData = this.getQuestionData.bind(this);
        this.setupQuestion = this.setupQuestion.bind(this);
    }

    componentWillUnmount() {
        if (this.props.timerselected) {
            clearInterval(this.timer)
        }
    }

    async componentDidMount() {
        console.log("Quiz did mount")
        var self = this;
        if (this.props.token === "") {
            const getTokenURL = "https://opentdb.com/api_token.php?command=request";
            await axios.get(getTokenURL)
            .then(function (response) {
                self.props.settoken(response.data.token);
                self.setState({
                    curToken: response.data.token
                });
            })
            .catch(function (error) {
                console.log(error);
            })
        } else {
            this.setState({
                curToken: this.props.token
            })
        }
        await this.getQuestionData()

        this.setupQuestion()

        this.setState({
            questionInProgress: true,
            curTimer: this.props.time,
        }, () => {if (this.props.timerselected) {
            this.startTimer()
        }})
    }

    async getQuestionData() {
        var self = this;
        var getQuestion = "https://opentdb.com/api.php?amount="
        getQuestion += this.props.totalquestions + "&token=" + this.state.curToken
        await axios.get(getQuestion)
        .then(async function (response) {
            self.setState({
                allQuestionData: response.data.results,
            })

        })
        .catch(function (error) {
            console.log(error);
        })
    }

    setupQuestion() {
        let curIndex = this.state.curQuestionNum - 1
        let optionsArray = this.state.allQuestionData[curIndex].incorrect_answers
        optionsArray.push(this.state.allQuestionData[curIndex].correct_answer.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"))
        var i;
        for (i = 0; i < optionsArray.length - 1; i++) {
            optionsArray[i] = optionsArray[i].replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        }
        let ans = optionsArray[optionsArray.length - 1]
        let newArr = this.randomizeArray(optionsArray)
        let curquestion = this.state.allQuestionData[curIndex].question.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
        this.setState({
            qAnswer: ans,
            curQuestion: curquestion,
            curOptions: newArr,
        });
    }

    async getNewQuestion() {
        var self = this;
        var getQuestion = "https://opentdb.com/api.php?amount=1"
        getQuestion += "&token=" + this.state.curToken
        await axios.get(getQuestion)
        .then(async function (response) {
            let optionsArray = await response.data.results[0].incorrect_answers
            optionsArray.push(response.data.results[0].correct_answer.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"))
            var i;
            for (i = 0; i < optionsArray.length - 1; i++) {
                optionsArray[i] = optionsArray[i].replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
            }
            let ans = optionsArray[optionsArray.length - 1]
            let newArr = await self.randomizeArray(optionsArray)
            let curquestion = response.data.results[0].question.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
            console.log("Question")
            self.setState((prevState, props) => ({
                qAnswer: ans,
                curQuestion: curquestion,
                curOptions: newArr,
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
        if (this.state.qAnswer == this.state.playerAnswer) {
            this.setState((prevState) => ({
                curScore: prevState.curScore + 1
            }))
        }
    }

    startTimer() {
        this.timer = setInterval(this.timerCountDown, 1000)
    }

    timerCountDown() {
        let tmpTime = this.state.curTimer
        if (tmpTime > 0 && 
            this.state.questionInProgress !== false) {
                this.setState({curTimer: tmpTime - 1})
        } else {
            clearInterval(this.timer)
            this.setState({questionInProgress: false})
        }
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

    submitAnswer(event) {
        this.setState({questionInProgress: false})
        this.checkAnswer()
        if (this.props.timerselected) {
            clearInterval(this.timer)
        }
    }

    async nextQuestionOrResults(event) {
        if (this.state.curQuestionNum < this.props.totalquestions) {
            console.log("b4" + this.state.curQuestionNum)
            this.setState((prevState, props) => ({
                playerAnswer: "",
                curQuestionNum: prevState.curQuestionNum + 1,
            }), () => {
                console.log("aft" + this.state.curQuestionNum)
                this.setupQuestion();
                //console.log("Runnign setupQ")
            })
        
            if (this.props.timerselected) {
                this.setState({
                    questionInProgress: true,
                    curTimer: this.props.time,
                }, this.startTimer()
                )
            } else {
                this.setState({
                    questionInProgress: true,
                })
            }
        } else {
            this.props.viewresults(this.state.curScore)
        }
    }

    renderSubmitButton() {
        return (
            
                <button
                type="button"
                className="submit-answer-btn"
                onClick={this.submitAnswer}
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
                onClick={this.nextQuestionOrResults}
                disabled={this.state.curQuestionNum == 0 || this.state.questionInProgress}
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
            curtime={this.state.curTimer}
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
            answer={this.state.qAnswer}
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