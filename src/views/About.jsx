import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <h1>About us</h1>
      <p>Know more about:</p>
      <ul>
        <li><NavLink to="/about/company">Our company</NavLink></li>
        <li><NavLink to="/about/teachers">Our teachers</NavLink></li>
      </ul>
      <Outlet />
    </div>
  )
}
