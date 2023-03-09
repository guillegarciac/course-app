import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <header>
        <h1>Best tech courses</h1>
      </header>
      <ul className="nav">
        <li><NavLink className="nav_link" to="/">Home</NavLink></li>
        <li><NavLink className="nav_link" to="/about/company">About</NavLink></li>
      </ul>
    </div>
  )
}
