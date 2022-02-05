import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Liked Songs from Spotify:</h1>
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
        </header>
      </div>
    );
  }
}

export default App;
