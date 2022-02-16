import React, { Component } from 'react';
import axios from 'axios';

//Homepage Component
class Homepage extends Component {
  state = { tracks: [], loaded: false };

  async componentDidMount() {
    //Get missing tracks
    await this.getMissingTracks();
  }

  getMissingTracks = async () => {
    const { data: tracks } = await axios.get(
      'http://localhost:4000/findMissingTracks'
    );

    //console.log(tracks);

    this.setState({ tracks });

    this.setState({ loaded: true });

    //console.log(this.state.tracks[0].name);
  };

  render() {
    if (this.state.loaded === false) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>Missing Songs:</h1>
          <h2>Loading...</h2>
          <div className="spinner-border text-primary" />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Missing Songs:</h1>
          <table className="table table-info">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Song</th>
                <th scope="col">Artist(s)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{this.state.tracks[0].name}</td>
                <td>Example Artist</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Homepage;
