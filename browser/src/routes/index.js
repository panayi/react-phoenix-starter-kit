import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'routes/App'
import Home from 'routes/Home'
import UsersList from 'routes/UsersList'
import UsersLogin from 'routes/UsersLogin'
import UsersNew from 'routes/UsersNew'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="users" component={UsersList} />
		<Route path="login" component={UsersLogin} />
		<Route path="signup" component={UsersNew} />
  </Route>
)
