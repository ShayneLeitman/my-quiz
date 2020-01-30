import React, { Component } from 'react';

class Timer extends Component {

    render() {

        return (
            <div className="timer">
                {this.props.curtime}
            </div>
        )
    }

}

export default Timer