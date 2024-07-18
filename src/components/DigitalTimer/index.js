import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: '00', stopwatch: 25, status: true}

  /* componentDidMount() {
    this.timerout = setInterval(this.tick, 1000)
  }
*/

  tick = () => {
    this.setState(prev => {
      if (parseInt(prev.seconds) === 0 && parseInt(prev.minutes) === 0) {
        clearInterval(this.timerout)
        return {minutes: 25, seconds: '00', stopwatch: 25, status: true}
      }

      if (parseInt(prev.seconds) === 0) {
        return {minutes: prev.minutes - 1, seconds: 59}
      }
      if (parseInt(prev.seconds) > 1 && parseInt(prev.seconds) < 11) {
        return {seconds: `0${parseInt(prev.seconds) - 1}`}
      }

      return {seconds: parseInt(prev.seconds) - 1}
    })
  }

  onDecrement = () => {
    const {stopwatch} = this.state
    if (parseInt(stopwatch) > 1) {
      this.setState(prev => ({
        minutes: prev.minutes - 1,
        stopwatch: prev.stopwatch - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prev => ({
      minutes: prev.minutes + 1,
      stopwatch: prev.stopwatch + 1,
    }))
  }

  changestatus = () => {
    const {minutes, seconds, status} = this.state
    if (minutes !== 0) {
      this.timerout = setInterval(this.tick, 1000)
      this.setState({status: !status})
    } else if (minutes === 0 && parseInt(seconds) === 0) {
      clearInterval(this.timerout)
    }
  }

  changepause = () => {
    clearInterval(this.timerout)
    this.setState(prev => ({
      minutes: prev.minutes,
      seconds: prev.seconds,
      status: !prev.status,
    }))
  }

  resetstatus = () => {
    clearInterval(this.timerout)
    this.setState({minutes: 25, seconds: '00', stopwatch: 25, status: true})
  }

  render() {
    const {minutes, seconds, stopwatch, status} = this.state
    return (
      <div className="background-container">
        <h1 className="mainheading">Digital Timer</h1>
        <div className="totalinner-container">
          <div className="inner-container">
            <div className="circle-form">
              <h1 className="heading1">
                {minutes}:{seconds}
              </h1>
              <p className="heading2">{status ? 'Paused' : 'Running'}</p>
            </div>
          </div>
          <div className="totaltimer-setup">
            <div className="timer-setup">
              <div className="aligntimer">
                {status && (
                  <button
                    type="button"
                    className="button-style"
                    onClick={this.changestatus}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                      className="pauseorstart"
                    />{' '}
                    <p className="button-element">Start</p>
                  </button>
                )}
                {!status && (
                  <button
                    type="button"
                    className="button-style"
                    onClick={this.changepause}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                      className="pauseorstart"
                    />{' '}
                    <p className="button-element">Pause</p>
                  </button>
                )}
              </div>
              <div className="aligntimer">
                <button
                  type="button"
                  className="button-style"
                  onClick={this.resetstatus}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="pauseorstart"
                    alt="reset icon"
                  />
                  {'  '} <p className="button-element">Reset</p>
                </button>
              </div>
            </div>
            <div className="limit-container">
              <p className="timerlimitpara">Set Timer Limit</p>
              <div className="buttons-container">
                {status && (
                  <button
                    type="button"
                    className="button"
                    onClick={this.onDecrement}
                  >
                    -
                  </button>
                )}
                {!status && (
                  <button type="button" className="button">
                    -
                  </button>
                )}
                <p className="time-setting"> {stopwatch} </p>
                {status && (
                  <button
                    type="button"
                    className="button1"
                    onClick={this.onIncrement}
                  >
                    +
                  </button>
                )}
                {!status && (
                  <button type="button" className="button1">
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
