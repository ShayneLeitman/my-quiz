import React from "react"

function Results(props) {

    return (
        <div className="results">
            <h1>Congratulations {props.playername}!</h1>
            <p>Your score was:</p>
            <p>{props.score} / {props.totalquestions}</p>

            <button
            className="play-again-btn"
            onClick={props.playquizagain}
            >
                Play Again!
            </button>
            <button
            className="return-to-main-menu-btn"
            onClick={() => props.returntomainmenu(1)}
            >
                Return to Main Menu
            </button>
        </div>
    )

}

export default Results;