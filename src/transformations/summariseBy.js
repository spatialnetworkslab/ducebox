import { curryN } from 'ramda'

import { into } from '../index.js'
import { REDUCIBLE } from '../symbols.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xsummariseByReducable from '../internal/_xsummariseByReducable.js'
import _xsummariseByIrreducable from '../internal/_xsummariseByIrreducable.js'

const _xsummariseBy = curryN(3, (f, by, xf) => {
  return _isReducable(f)
    ? _xsummariseByReducable(f, by, xf)
    : _xsummariseByIrreducable(f, by, xf)
})

const summariseBy = curryN(3, _dispatchable([], _xsummariseBy,
  function (f, by, df) {
    return into(
      [],
      summariseBy(f, by),
      df
    )
  }
))

export default summariseBy

function _isReducable (f) {
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
