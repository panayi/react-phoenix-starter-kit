import React, { Component, PropTypes } from 'react'
import '../styles/core.css'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
