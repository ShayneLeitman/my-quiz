import React, { Component } from 'react';

function AnswerOption(props) {

    return (
        <div className="answer-option">
            <button
                type="button"
                className={
                    (props.questioninprogress) ?
                        (props.playeranswer === props.curoption) ?
                            'selected-option' : 'option-button'
                    :   (props.answer === props.curoption) ?
                            'selected-correct'
                        : (props.playeranswer === props.curoption) ?
                            'selected-incorrect' : 'option-button'
                }
                onClick={() => props.updateanswer(props.curoption)}
                disabled={!props.questioninprogress}
            >
                { props.curoption }
            </button>
        </div>
    )

}


export default AnswerOption;