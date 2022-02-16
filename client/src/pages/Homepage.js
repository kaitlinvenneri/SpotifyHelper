import React, { Component } from 'react';
import axios from 'axios';

//Homepage Component
class Homepage extends Component {
  state = {};

  async componentDidMount() {
    //Get missing tracks
    await this.getMissingTracks();
  }

  getMissingTracks = async () => {
    const { data: tracks } = await axios.get(
      'http://localhost:4000/findMissingTracks'
    );

    //this.setState({ tracks });
  };

  render() {
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
              <td>Example Song</td>
              <td>Example Artist</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Homepage;
