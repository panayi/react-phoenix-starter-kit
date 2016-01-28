import { applyMiddleware, compose, createStore } from 'redux'
import credentials from 'redux-effects-credentials'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import effects from 'redux-effects'
import fetch from 'redux-effects-fetch'
import localstorage from 'redux-effects-localstorage'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import { tokenSelector } from './selectors'
import authenticate from './middleware/authenticate'
import rootReducer from './rootReducer'

export const history = browserHistory

const authenticatedApiRequest = RegExp(`${API_URL}\/api`)

export default function configureStore(initialState: ?Object) {
  let createStoreWithMiddleware

  const middleware = applyMiddleware(
    authenticate,
    effects,
    credentials.bearer(authenticatedApiRequest, tokenSelector),
    fetch,
    localstorage(window.localStorage),
    multi,
    syncHistory(history),
    thunk
  )

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      window.devToolsExtension
        ? window.devToolsExtension()
        : require('containers/DevTools').default.instrument()
    )
  } else {
    createStoreWithMiddleware = compose(
      middleware
    )
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  )

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer')

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
