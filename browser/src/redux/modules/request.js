import { bind } from 'redux-effects'
import { createAction, handleActions } from 'redux-actions'
import { fetch } from 'redux-effects-fetch'
import R from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_STARTED = 'REQUEST_STARTED'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
const REQUEST_FAIL = 'REQUEST_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
const requestStarted = createAction(REQUEST_STARTED)
const requestSuccess = createAction(REQUEST_SUCCESS)
const requestFail = createAction(REQUEST_FAIL)

// ------------------------------------
// Helpers
// ------------------------------------
const normalizeOptions = (options) => {
  const headers = R.merge({
    // Accept: 'application/json',
    'Content-Type': 'application/json'
  }, options.headers || {})

  const body = options.method === 'POST' && options.body
    ? JSON.stringify(options.body)
    : options.body

  return R.mergeAll([options, { headers }, { body }])
}

// ------------------------------------
// Action creators
// (actually, action-creators creators)
// ------------------------------------
export const request =
  ({ uuid, path, options = {}, getOptions, success, fail }) => actionParams => {
    const fetchParams = R.is(Function, getOptions)
      ? getOptions(actionParams)
      : options
    const finalFetchParams = normalizeOptions(fetchParams)

    const url = API_URL + path

    const fetchSuccess = ({ value }) =>
      R.map(R.flip(R.call)({ uuid, response: value }))(
        success ? R.flatten([success, requestSuccess]) : [requestSuccess]
      )

    const fetchFail = ({ value: { errors } }) =>
      R.map(R.flip(R.call)({ uuid, errors }))(
        fail ? R.flatten([fail, requestFail]) : [requestFail]
      )

    return [
      requestStarted({ uuid }),
      bind(fetch(url, finalFetchParams), fetchSuccess, fetchFail)
    ]
  }

export const findAll = type =>
  request({
    uuid: type,
    path: `/api/${type}`,
  })()

export const findOne = (type, id) =>
  request({
    uuid: `${type}:${id}`,
    path: `/api/${type}/${id}`,
  })()

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [REQUEST_STARTED]: (state, { payload: { uuid } }) =>
    R.assoc(uuid, { isLoading: true }, state),

  [REQUEST_SUCCESS]: (state, { payload: { uuid } }) =>
    R.assoc(uuid, { isSuccess: true }, state),

  [REQUEST_FAIL]: (state, { payload: { uuid, errors } }) =>
    R.assoc(uuid, { isError: true, errors }, state)
}, {})
