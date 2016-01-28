import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { goTo as _goTo } from 'redux/modules/routing'
import { needsVisitor } from 'helpers/checkAuth'
import { register as _register } from 'redux/modules/auth'
import { isAuthenticatedSelector, requestSelector } from 'redux/selectors'
import RequestErrors from 'components/RequestErrors'


class UsersNew extends Component {
  static propTypes = {
    goTo: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func,
    request: PropTypes.object
  };

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const { register } = this.props
    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value
    const data = { user: { name, email, password } }

    register({ data })
  }

  render() {
    const { request } = this.props

    return (
      <div className="container">
        <h1>New User</h1>
        {request && <RequestErrors errors={request.errors} />}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Name</label>
            <input type="text" name="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="form-control email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control password"
            />
          </div>
          <input type="submit" className="btn btn-default" />
        </form>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  request: requestSelector('register')
})
const actions = {
  goTo: _goTo,
  register: _register
}
export default connect(selector, actions)(needsVisitor('')(UsersNew))
