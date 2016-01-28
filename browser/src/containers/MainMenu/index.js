import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CSSModules from 'react-css-modules'
import { getProfile as _getProfile } from 'redux/modules/auth'
import { isAuthenticatedSelector } from 'redux/selectors'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'
import style from './style.css'

class MainMenu extends Component {
  static propTypes = {
    getProfile: PropTypes.func,
    isAuthenticated: PropTypes.bool
  };

  render() {
    const { isAuthenticated } = this.props
    const links = isAuthenticated ? <LoggedInLinks /> : <LoggedOutLinks />

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">React Phoenix Starter Kit</a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            {links}
          </div>
        </div>
      </nav>
    )
  }
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})
const actions = {
  getProfile: _getProfile
}

export default connect(selector, actions)(CSSModules(MainMenu, style))
