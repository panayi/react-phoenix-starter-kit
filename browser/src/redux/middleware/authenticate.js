import R from 'ramda'
import { isActionOfType } from 'helpers/pureFunctions'
import { getProfile, AUTHENTICATE } from 'redux/modules/auth'
import { hasProfileSelector, hasTokenSelector, isAuthenticatedSelector }
  from 'redux/selectors'

const isAuthenticateAction = isActionOfType(AUTHENTICATE)

export default R.curry(({ dispatch, getState }, next, action) => {
  if (!isAuthenticateAction(action)) {
    return next(action)
  }

  const state = getState()
  const hasProfile = hasProfileSelector(state)
  const hasToken = hasTokenSelector(state)
  const isAuthenticated = isAuthenticatedSelector(state)

  if ((hasToken && !isAuthenticated) || (isAuthenticated && !hasProfile)) {
    return dispatch(getProfile())
  }
})
