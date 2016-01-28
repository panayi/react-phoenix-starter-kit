import React, { Component } from 'react'
import { Link } from 'react-router'

class LoggedOutLinks extends Component {
  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    )
  }
}

export default LoggedOutLinks
