import { curryN } from 'ramda'

import { into } from '../index.js'
import _dispatchable from '../internal/_dispatchable.js'
import { _isReducable } from './summariseBy.js'
import _xfilterByReducable from '../internal/_xfilterByReducable.js'
import _xfilterByIrreducable from '../internal/_xfilterByIrreducable.js'

const _xfilterBy = curryN(4, function _xfilterBy (summariseFn, predicate, by, xf) {
  return _isReducable(summariseFn)
    ? _xfilterByReducable(summariseFn, predicate, by, xf)
    : _xfilterByIrreducable(summariseFn, predicate, by, xf)
})

const filterBy = curryN(4, _dispatchable([], _xfilterBy,
  function (summariseFn, predicate, by, df) {
    return into(
      [],
      filterBy(summariseFn, predicate, by),
      df
    )
  }
))

export default filterBy
