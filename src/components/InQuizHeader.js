import React, { Component } from 'react';
import QuestionCount from "./QuestionCount"

function InQuizHeader(props) {

    return (
        <div className="inquizheader">
            <h1> Player: { props.playername } </h1>
            <QuestionCount curQuestionNum={props.curQuestionNum}
            totalquestions={props.totalquestions}
            />
            
        </div>
    )

}


export default InQuizHeader;