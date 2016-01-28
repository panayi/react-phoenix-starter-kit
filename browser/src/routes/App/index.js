import React, { Component, PropTypes } from 'react'
import MainMenu from 'containers/MainMenu'
import { authenticate as _authenticate } from 'redux/modules/auth'
import { connect } from 'react-redux'
import '../../styles/core.css'

class App extends Component {
  static propTypes = {
    authenticate: PropTypes.func,
    children: PropTypes.node
  };

  componentWillMount() {
    const { authenticate } = this.props
    authenticate()
  }

  render() {
    return (
      <div>
        <MainMenu />
        {this.props.children}
      </div>
    )
  }
}

const actions = {
  authenticate: _authenticate
}

export default connect(null, actions)(App)
