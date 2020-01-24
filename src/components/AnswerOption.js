import React, { Component } from 'react';

function AnswerOption(props) {

    return (
        <li className="answer-option">
            <button
                type="button"
                className={ (props.playeranswer === props.curoption) ?
                    (props.answer === null) ?
                        'selected-option' :
                            (props.answer === props.curoption) ?
                                'selected-correct' : 'selected-incorrect'
                    : 'option-button'
                }
                onClick={() => props.updateanswer(props.curoption)}
            >
                { props.curoption }
            </button>
        </li>
    )

}


export default AnswerOption;