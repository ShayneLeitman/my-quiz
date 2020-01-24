import React, { Component } from 'react';

function Question(props) {

    return (
        <div className="question">
            { props.curquestion }
        </div>
    )

}


export default Question;