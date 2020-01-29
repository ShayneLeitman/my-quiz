import React, { Component } from 'react';

class Timer extends Component {

    constructor() {
        super()

        this.state = {
            startTime: 0,
            isOn: false,
            curTime: 0
        }
    }

    componentDidMount() {
        this.setState({startTime: this.props.startTime})
    }

    render() {

        return (
            <div className="timer">
                {this.state.startTime}
            </div>
        )
    }

}

export default Timer