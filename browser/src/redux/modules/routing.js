import { routeActions, routeReducer } from 'react-router-redux'
import { urlFor } from 'helpers/pureFunctions'

// ------------------------------------
// Actions
// ------------------------------------
export const goTo = (path) => routeActions.push(urlFor('', path))

// ------------------------------------
// Reducer
// ------------------------------------
export default routeReducer
