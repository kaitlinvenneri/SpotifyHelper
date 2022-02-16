import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
