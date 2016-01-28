import { createAction, handleActions } from 'redux-actions'
import { setItem } from 'redux-effects-localstorage'
import R from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------
const SAVE_TOKEN = 'SAVE_TOKEN'
const DELETE_TOKEN = 'DELETE_TOKEN'

// ------------------------------------
// Helpers
// ------------------------------------

// getData :: String -> Object
const getData = () =>
  R.compose(
    JSON.parse,
    R.defaultTo('{}'),
  )(window.localStorage.getItem(LOCALSTORAGE_ROOT))

// updateAttr :: String -> Any -> String
const updateAttr = (key, value) => {
  const oldData = getData()
  const newData = R.assoc(key, value, oldData)
  return JSON.stringify(newData)
}

// deleteAttr:: String -> String
const deleteAttr = key => {
  const oldData = getData()
  const newData = R.dissoc(key, oldData)
  return JSON.stringify(newData)
}

// ------------------------------------
// Actions
// ------------------------------------
export const saveToken =
  ({ response: { data: { attributes: { token } } } }) => [
    createAction(SAVE_TOKEN)(token),
    setItem(LOCALSTORAGE_ROOT, updateAttr('token', token))
  ]

export const deleteToken = () => [
  createAction(DELETE_TOKEN)(),
  setItem(LOCALSTORAGE_ROOT, deleteAttr('token'))
]

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SAVE_TOKEN]: (state, { payload }) => payload,

  [DELETE_TOKEN]: R.always('')
}, getData().token || '')
