import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Player, ControlBar } from 'video-react';

const sources = {
  bunnyMovie: "http://media.w3.org/2010/05/bunny/movie.mp4",
}
export default class App extends Component {
  state = { source: sources.bunnyMovie }
  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }
  handleStateChange(state) {
    this.setState({
      player: state,
      duration: state.duration,
      currentSrc: state.currentSrc,
      currentTime: state.currentTime,
      waiting: state.waiting,
      muted: state.muted,
      volume: state.volume,
      videoWidth: state.videoWidth,
      videoHeight: state.videoHeight,
      preload: state.preload,
      loop: state.loop,
      controls: state.controls,
      textTracks: state.textTracks,
      poster: ''    
    });
  }
  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.player.getState();
      this.player.seek(player.currentTime + seconds);
    };
  }
  // getCurrentTime() {
  //   return () => {
  //     // const { player } = this.player.getState();
  //     var currentSeconds = this.player.currentTime;
  //     var currentMinutes = 0;
  //     if (currentSeconds > 60) {
  //       currentMinutes += 1;
  //       currentMinutes = 0;
  //     }
  //     console.log(this.player.currentTime);
  //   }
  // }

  render() {
    return (
      <div>
        <div className="container">
          <Player ref={(player) => { this.player = player }}>
            <source src={this.state.source} />
            <ControlBar autoHide={false} />
          </Player>
          <button className="btn btn-secondary" onClick={this.changeCurrentTime(10)}>add 10 seconds</button>
          <div>
            <h3>Current Time: {Math.round(this.state.currentTime * 1)}</h3>
            <h5>duration : {this.state.duration}</h5>
            <h5>URL: <a href={this.state.currentSrc}>{this.state.currentSrc}</a></h5>
            <h5>video width: {this.state.videoWidth}</h5>
            <h5>video height: {this.state.videoHeight}</h5>
          </div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.querySelector('#root')
);