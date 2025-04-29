import React from 'react';
import './Navbar.css'; // We will create a new file for styling
import logo from '../Asserts/pokeapi_256.3fa72200.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
		<img src={logo} alt="logo" srcset="" className="navbar-logo" />
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
