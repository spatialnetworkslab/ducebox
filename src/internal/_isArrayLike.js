// Adapted from ramda: https://github.com/ramda/ramda
import _isArray from './_isArray.js'
import _isString from './_isString.js'

import { curryN } from 'ramda'

const _isArrayLike = curryN(1, function isArrayLike (x) {
  if (_isArray(x)) { return true }
  if (!x) { return false }
  if (typeof x !== 'object') { return false }
  if (_isString(x)) { return false }
  if (x.length === 0) { return true }
  if (x.length > 0) {
    return 0 in x && (x.length - 1) in x
  }
  return false
})

export default _isArrayLike
