import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { goTo as _goTo } from 'redux/modules/routing'
import { login as _login } from 'redux/modules/auth'
import { needsVisitor } from 'helpers/checkAuth'
import { isAuthenticatedSelector, requestSelector } from 'redux/selectors'
import RequestErrors from 'components/RequestErrors'

class UserLogin extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    goTo: PropTypes.func,
    login: PropTypes.func,
    request: PropTypes.object
  };

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const { login } = this.props
    const email = event.target.email.value
    const password = event.target.password.value
    const data = { session: { email, password } }
    login({ data })
  }

  render() {
    const { request } = this.props

    return (
      <div className="container">
        <h1>Login</h1>
        {request && <RequestErrors errors={request.errors} />}
        <form onSubmit={this.handleSubmit}>
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
          <input
            type="submit"
            className="btn btn-default"
            disabled={request && request.isLoading}
          />
        </form>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  request: requestSelector('login')
})
const actions = {
  goTo: _goTo,
  login: _login
}

export default connect(selector, actions)(needsVisitor('')(UserLogin))
