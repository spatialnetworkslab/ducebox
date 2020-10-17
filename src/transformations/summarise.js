import { reduce, curryN, into } from 'ramda'

import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'
import _isTransformer from '../internal/_isTransformer.js'

const _xsummarise = (f, by) => {
  return _isReducible(f)
}

const summarise = curryN(3, _dispatchable([], function (f, by, list) {}))

function _isReducible (f) {
  try {
    const summariseInstructions = f({})

    for (const newColumn in summariseInstructions) {

    }
  } catch (e) {
    return false
  }
}
