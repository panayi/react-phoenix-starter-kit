import { createAction, handleActions } from 'redux-actions'
import R from 'ramda'
import { deleteToken, saveToken } from './token'
import { request } from './request'

// ------------------------------------
// Constants
// ------------------------------------
export const AUTHENTICATE = 'AUTHENTICATE'
const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export const authenticate = createAction(AUTHENTICATE)
const authenticateSuccess = createAction(AUTHENTICATE_SUCCESS)
const authenticateFail = createAction(AUTHENTICATE_FAIL)

export const getProfile = request({
  uuid: 'profile',
  path: '/api/profile',
  success: authenticateSuccess,
  fail: [deleteToken, authenticateFail]
})

export const register = request({
  uuid: 'register',
  path: '/register',
  getOptions: ({ data }) => ({
    method: 'POST',
    body: data
  }),
  success: [saveToken, getProfile],
  fail: [deleteToken, authenticateFail]
})

export const login = request({
  uuid: 'login',
  path: '/login',
  getOptions: ({ data }) => ({
    method: 'POST',
    body: data
  }),
  success: [saveToken, getProfile],
  fail: [deleteToken, authenticateFail]
})


export const logout = () => [deleteToken(), authenticateFail()]

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [AUTHENTICATE_SUCCESS]: R.always(true),

  [AUTHENTICATE_FAIL]: R.always(false)
}, null)
