import React, { Component } from 'react';
import TrackListing from './../components/TrackListing';

//Track List Component
class TrackList extends Component {
  state = { tracks: this.props.tracks };

  //Update state if given new props from parent component
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.tracks !== prevProps.tracks ||
      this.props.tracks !== prevState.tracks
    ) {
      this.setState({ tracks: this.props.tracks });
    }
  }

  render() {
    //this.state.tracks.map((track, index) => console.log(index));

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Song</th>
              <th scope="col">Artist(s)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tracks.map((track, index) => (
              <TrackListing key={index} index={index} track={track} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TrackList;
