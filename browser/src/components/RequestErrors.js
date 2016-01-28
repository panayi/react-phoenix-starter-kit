import React, { Component, PropTypes } from 'react'
import { mapIndexed } from 'helpers/pureFunctions'
import Alert from 'components/Alert'

export default class RequestErrors extends Component {
  static propTypes = {
    errors: PropTypes.array
  };

  static defaultProps = {
    errors: []
  };

  render() {
    const errors = mapIndexed(
      (err, index) => <Alert key={index} type="danger" msg={err.detail} />,
      this.props.errors
    )

    return <div>{errors}</div>
  }
}
