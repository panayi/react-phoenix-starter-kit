import React, { Component, PropTypes } from 'react'

export default class Error extends Component {
  static propTypes = {
    msg: PropTypes.string,
    type: PropTypes.string
  };

  render() {
    const { msg, type } = this.props
    const classNames = `alert alert-${type}`

    return (
      <div className={classNames} role="alert">
        {msg}
      </div>
    )
  }
}
