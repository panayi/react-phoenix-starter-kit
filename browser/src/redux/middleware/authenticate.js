import R from 'ramda'
import { isActionOfType } from 'helpers/pureFunctions'
import { getProfile, AUTHENTICATE } from 'redux/modules/auth'
import { hasProfileSelector, isAuthenticatedSelector }
  from 'redux/selectors'

const isAuthenticateAction = isActionOfType(AUTHENTICATE)

export default R.curry(({ dispatch, getState }, next, action) => {
  if (!isAuthenticateAction(action)) {
    return next(action)
  }

  const state = getState()
  const hasProfile = hasProfileSelector(state)
  const isAuthenticated = isAuthenticatedSelector(state)

  if (isAuthenticated === null || !hasProfile) {
    return dispatch(getProfile())
  }
})
