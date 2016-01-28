import { handleActions } from 'redux-actions'
import R from 'ramda'
import { RECEIVED_MESSAGE } from './socket'
import { REQUEST_SUCCESS } from './request'

// ------------------------------------
// Helpers
// ------------------------------------

// makeArray :: Any -> Array
const makeArray = R.ifElse(R.is(Array), R.identity, R.of)

// combine :: Array -> Array -> Array
const combine = R.compose(
  R.uniqBy(R.prop('id')),
  R.useWith(R.concat, [R.defaultTo([]), R.defaultTo([])])
)

// withData :: Object -> Array|Object -> String -> Object
const withData = (state, data) =>
  R.compose(
    R.merge(state),
    R.mapObjIndexed(
      (records, key) => combine(R.map(R.prop('data'), records), state[key])
    ),
    R.groupBy(R.prop('type')),
    makeArray
  )(data)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [REQUEST_SUCCESS]: (state, { payload: { response } }) =>
    withData(state, response),

  [RECEIVED_MESSAGE]: (state, { payload: { message } }) =>
    withData(state, message)
}, [])
