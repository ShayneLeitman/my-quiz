import React, { Component } from 'react';

function QuestionCount(props) {

    return (
        <div className="questioncount">
            Question # <span>{ props.curQuestionNum }
            </span> of <span>{ props.totalquestions }</span>
        </div>
    )

}


export default QuestionCount;