import R from 'ramda'

// ------------------------------------
// General
// ------------------------------------

// urlFor :: URL -> String -> URL
export const urlFor = R.curry((base, path) =>
  R.ifElse(
    R.compose(R.equals('/'), R.head),
    R.concat(base),
    R.concat(`${base}/`)
  )(path)
)

// invokeLater :: Number -> Number -> Function -> Function
export const invokeLater = (arity, delay, callback) => {
  const invoker = function () {
    return window.setTimeout(() => {
      callback.apply(null, Array.prototype.slice.call(arguments))
    }, delay)
  }
  return arity > 0 ? R.curryN(arity, invoker) : invoker()
}

// mapIndexed :: Function -> List -> List
export const mapIndexed = R.addIndex(R.map)

// propsChanged :: String[] -> Object -> Object -> Boolean
export const propsChanged = (propsArray, props, nextProps) =>
  R.useWith(R.compose(R.not, R.equals), [
    R.pick(propsArray),
    R.pick(propsArray)
  ])(props, nextProps)

// ------------------------------------
// Redux
// ------------------------------------

// dispatch -> Store -> Action -> ?
export const dispatch = R.useWith(R.call, [
  R.prop('dispatch'),
  R.identity
])

// isActionOfType -> ActionType -> Action -> Boolean
export const isActionOfType = R.useWith(R.equals, [
  R.identity,
  R.prop('type')
])

// state -> Selector -> Store -> *
export const state = R.useWith(R.call, [
  R.identity,
  R.invoker(0, 'getState')
])
