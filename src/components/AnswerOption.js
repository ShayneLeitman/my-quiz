import React, { Component } from 'react';

function AnswerOption(props) {

    return (
        <div className="answer-option">
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
                disabled={!props.questioninprogress}
            >
                { props.curoption }
            </button>
        </div>
    )

}


export default AnswerOption;