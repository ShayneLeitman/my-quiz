import React from "react"

function Results(props) {

    return (
        <div className="results">
            <h1>Congratulations {props.playername}!</h1>
            <p>Your score was:</p>
            <p>{props.score} / {props.totalquestions}</p>

            <button
            className="play-again-tbn"
            onClick={props.playquizagain}
            >
                Play Again!
            </button>
        </div>
    )

}

export default Results;