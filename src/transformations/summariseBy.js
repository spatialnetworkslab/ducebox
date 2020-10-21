import { curryN } from 'ramda'

import { into } from '../index.js'
import { REDUCABLE } from '../internal/_symbols.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xsummariseByReducable from '../internal/_xsummariseByReducable.js'
import _xsummariseByIrreducable from '../internal/_xsummariseByIrreducable.js'

const _xsummariseBy = curryN(3, (summariseFn, by, xf) => {
  return _isReducable(summariseFn)
    ? _xsummariseByReducable(summariseFn, by, xf)
    : _xsummariseByIrreducable(summariseFn, by, xf)
})

const summariseBy = curryN(3, _dispatchable([], _xsummariseBy,
  function (summariseFn, by, df) {
    return into(
      [],
      summariseBy(summariseFn, by),
      df
    )
  }
))

export default summariseBy

export function _isReducable (summariseFn) {
  try {
    const summariseInstructions = summariseFn({})

    for (const newColumnName in summariseInstructions) {
      if (summariseInstructions[newColumnName] !== REDUCABLE) {
        return false
      }
    }
  } catch (e) {
    return false
  }

  return true
}
