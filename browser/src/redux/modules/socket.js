import { createAction, handleActions } from 'redux-actions'
import R from 'ramda'
import { Socket } from 'static/phoenix'

// ------------------------------------
// Constants
// ------------------------------------
const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS'
const SUBSCRIBE_FAIL = 'SUBSCRIBE_FAIL'
const UNSUBSCRIBE_SUCCESS = 'UNSUBSCRIBE_SUCCESS'
const UNSUBSCRIBE_FAIL = 'UNSUBSCRIBE_FAIL'
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE'

// TODO: this should go in a function
const socket = new Socket('ws://localhost:4000/socket')
socket.connect()

// ------------------------------------
// Actions
// ------------------------------------
const subscribeSuccess = createAction(SUBSCRIBE_SUCCESS)
const subscribeFail = createAction(SUBSCRIBE_FAIL)
const unsubscribeSuccess = createAction(UNSUBSCRIBE_SUCCESS)
const unsubscribeFail = createAction(UNSUBSCRIBE_FAIL)
const receivedMessage = createAction(RECEIVED_MESSAGE)

export const subscribe = channelKey => (dispatch, getState) => {
  const handle = socket.channel(channelKey, {})

  handle.join().receive('ok', () => {
    dispatch(subscribeSuccess({ channelKey, handle }))

    // Listen for all incoming messages
    handle.onMessage = (event, payload, ref) =>
      dispatch(receivedMessage({ event, message: payload }))

  }).receive('error', (error) => {
    dispatch(subscribeFail({ channelKey, error }))
  })
}

export const unsubscribe = channelKey => (dispatch, getState) => {
  const channel = R.path(['channels', channelKey], getState())
  if (channel) {
    channel.handle.leave().receive('ok', () => {
      dispatch(unsubscribeSuccess({ channelKey }))
    }).receive('error', (error) =>
      dispatch(unsubscribeFail({ channelKey, error }))
    )
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SUBSCRIBE_SUCCESS]: (state, { payload: { channelKey, handle } }) =>
    R.assoc(channelKey, { handle }, state),

  [SUBSCRIBE_FAIL]: (state, { payload: { channelKey, error } }) =>
    R.assoc(channelKey, { error }, state),

  [UNSUBSCRIBE_SUCCESS]: (state, { payload: { channelKey } }) =>
    R.dissoc(channelKey, state),

  [UNSUBSCRIBE_FAIL]: (state, { payload: { channelKey, error } }) =>
    R.assoc(channelKey, { error }, state),
}, {})
