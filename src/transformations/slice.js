import { curryN, into } from 'ramda'

import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'
import _reduced from '../internal/_reduced.js'

const _xslice = curryN(2, function _xslice (indices, xf) {
  return new XSlice(indices, xf)
})

const slice = curryN(2, _dispatchable([], _xslice,
  function (indices, df) {
    return into(
      [],
      slice(indices),
      df
    )
  }
))

export default slice

function XSlice (indices, xf) {
  this.indices = new Set(indices)
  this.xf = xf

  this.counter = -1
}

XSlice.prototype['@@transducer/init'] = _xfBase.init
XSlice.prototype['@@transducer/result'] = _xfBase.result
XSlice.prototype['@@transducer/step'] = function (acc, row) {
  this.counter++

  if (this.indices.has(this.counter)) {
    this.indices.delete(this.counter)
    const output = this.xf['@@transducer/step'](acc, row)

    return this.indices.size === 0
      ? _reduced(output)
      : output
  }

  return acc
}
