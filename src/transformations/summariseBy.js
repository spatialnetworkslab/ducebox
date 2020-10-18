import { curryN } from 'ramda'

import { REDUCIBLE } from '../symbols.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xsummariseByReducable from '../internal/_xsummariseByReducable.js'
import _xsummariseByIrreducable from '../internal/_xsummariseByIrreducable.js'

const _xsummariseBy = (f, by, xf) => {
  return _isReducible(f)
    ? _xsummariseByReducable(f, by, xf)
    : _xsummariseByIrreducable(f, by, xf)
}

const summariseBy = curryN(3, _dispatchable([], _xsummariseBy, function summariseBy (f, by, df) {}))

export default summariseBy

function _isReducible (f) {
  try {
    const summariseInstructions = f({})

    for (const newColumnName in summariseInstructions) {
      if (summariseInstructions[newColumnName] !== REDUCIBLE) {
        return false
      }
    }
  } catch (e) {
    return false
  }

  return true
}
