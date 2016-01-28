import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { findAllSelector, isAuthenticatedSelector } from 'redux/selectors'
import { findAll as _findAll } from 'redux/modules/request'
import { goTo as _goTo } from 'redux/modules/routing'
import { needsUser } from 'helpers/checkAuth'
import { subscribe as _subscribe, unsubscribe as _unsubscribe }
  from 'redux/modules/socket'

class UsersList extends Component {
  static propTypes = {
    addUser: PropTypes.func,
    channels: PropTypes.object,
    findAll: PropTypes.func,
    goTo: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
    users: PropTypes.array
  };

  componentDidMount() {
    const { findAll, subscribe } = this.props
    subscribe('users:new')
    findAll('users')
  }

  componentWillUnmount() {
    this.props.unsubscribe('users:new')
  }

  render() {
    const { users } = this.props
    return (
      <div className="container">
        <h1>Users List</h1>
        <div className="users-list">
          <ul className="list-group">
            {users.map((user, index) =>
              <li key={index} className="list-group-item">
                {user.email}
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  users: findAllSelector('users')
})
const actions = {
  findAll: _findAll,
  goTo: _goTo,
  subscribe: _subscribe,
  unsubscribe: _unsubscribe
}

export default connect(selector, actions)(needsUser('/login')(UsersList))
