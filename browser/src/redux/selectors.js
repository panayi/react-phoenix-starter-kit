import R from 'ramda'

// ------------------------------------
// Data
// ------------------------------------

// allDataSelector :: State -> Array
const allDataSelector = R.prop('data')

// findAllSelector :: Type -> State -> Array
export const findAllSelector = type =>
  R.compose(
    R.defaultTo([]),
    R.prop(type),
    allDataSelector
  )

// findSingleSelector :: Type -> String -> State -> Object
export const findOneSelector = (type, id) =>
  R.compose(
    R.find(R.prop('id'), id),
    findAllSelector(type)
  )

// findSingleSelector :: Type -> State -> Object
export const findSingleSelector = type =>
  R.compose(
    R.head,
    findAllSelector(type)
  )

// ------------------------------------
// IsAuthenticated
// ------------------------------------

// isAuthenticatedSelector :: State -> Boolean
export const isAuthenticatedSelector = R.prop('isAuthenticated')

// ------------------------------------
// Token
// ------------------------------------

// tokenSelector :: State -> String
export const tokenSelector = R.prop('token')

// hasTokenSelector :: State -> Boolean
export const hasTokenSelector = R.compose(
  R.not,
  R.isEmpty,
  tokenSelector
)

// ------------------------------------
// Convenience selectors
// ------------------------------------

// profileSelector :: State -> Object
export const profileSelector = findSingleSelector('profile')

// hasProfileSelector :: State -> Boolean
export const hasProfileSelector = R.compose(
  R.not,
  R.isEmpty,
  R.defaultTo({}),
  profileSelector
)
