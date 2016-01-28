import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import Root from './containers/Root'
import configureStore, { history } from './redux/configureStore'

const initialState = JSON.parse(localStorage.redux || '{}')
const store = configureStore(initialState)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
