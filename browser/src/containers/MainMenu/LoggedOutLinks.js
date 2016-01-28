import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'

class LoggedOutLinks extends Component {
  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><IndexLink activeClassName="active" to="/">Home</IndexLink></li>
        <li><Link activeClassName="active" to="/signup">Signup</Link></li>
        <li><Link activeClassName="active" to="/login">Login</Link></li>
      </ul>
    )
  }
}

export default LoggedOutLinks
