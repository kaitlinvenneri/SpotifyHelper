import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Component to navigate between pages
class NavBar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand navbar-light"
        style={{ backgroundColor: '#b3e6b3' }}
      >
        <Link className="navbar-brand" to="/">
          Spotify Helper
        </Link>
      </nav>
    );
  }
}

export default NavBar;
