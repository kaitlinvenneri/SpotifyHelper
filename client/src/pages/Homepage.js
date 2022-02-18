import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './../components/NavBar';
import TrackList from './../components/TrackList';

//Homepage Component
class Homepage extends Component {
  state = { tracks: [], loaded: false };

  async componentDidMount() {
    //Get missing tracks
    await this.getMissingTracks();
  }

  getMissingTracks = async () => {
    //Get temporary data for now
    const { data: tracks } = await axios.get(
      'http://localhost:4000/missingTracksTemp'
    );

    //console.log(tracks);

    this.setState({ tracks });

    this.setState({ loaded: true });

    //console.log(this.state.tracks[0].name);
  };

  render() {
    if (this.state.loaded === false) {
      return (
        <div>
          <NavBar></NavBar>
          <div className="mt-2 d-flex flex-column justify-content-center align-items-center">
            <h1>Loading...</h1>
            <div className="spinner-border text-info" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <NavBar></NavBar>
          <h1 className="mt-2">Missing Songs</h1>
          <TrackList tracks={this.state.tracks}></TrackList>
        </div>
      );
    }
  }
}

export default Homepage;
