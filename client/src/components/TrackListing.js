import React, { Component } from 'react';

//Track List Component
class TrackList extends Component {
  state = { index: this.props.index, track: this.props.track };

  //Update state if given new props from parent component
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.track !== prevProps.track ||
      this.props.track !== prevState.track
    ) {
      this.setState({ track: this.props.track });
    }
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.state.index + 1}</th>
        <td>{this.state.track.name}</td>
        <td>{this.state.track.artists[0]}</td>
      </tr>
    );
  }
}

export default TrackList;
