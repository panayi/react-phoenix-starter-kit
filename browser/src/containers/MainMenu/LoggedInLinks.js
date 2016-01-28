import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router'
import { profileSelector } from 'redux/selectors'
import { logout as _logout } from 'redux/modules/auth'

class LoggedInLinks extends Component {
  static propTypes = {
    logout: PropTypes.func,
    profile: PropTypes.object
  };

  render() {
    const { logout, profile } = this.props
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/">Home</Link></li>
        <li><Link activeClassName="active" to="/users">Users</Link></li>
        <li className="dropdown">
          <a
            href="#"
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {profile && profile.email} <span className="caret"></span>
          </a>
          <ul className="dropdown-menu">
            <li><a>{profile && profile.name || 'Anonymous'}</a></li>
            <li className="divider"></li>
            <li><a href="#" onClick={logout}>Logout</a></li>
          </ul>
        </li>
      </ul>
    )
  }
}

const selector = createStructuredSelector({
  profile: profileSelector
})
const actions = {
  logout: _logout
}

export default connect(selector, actions)(LoggedInLinks)
