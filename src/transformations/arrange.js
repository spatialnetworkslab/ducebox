import { reduce, curryN, into } from 'ramda'

import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'

const _xarrange = curryN(2, function _xarrange (arrangeInstructions, xf) {
  return new XArrange(arrangeInstructions, xf)
})

const arrange = curryN(2, _dispatchable([], _xarrange,
  function (arrangeInstructions, df) {
    return into(
      [],
      arrange(arrangeInstructions),
      df
    )
  }
))

export default arrange

function XArrange (arrangeInstructions) {
  this.arrangeFn = arrangeInstructions.constructor === Function
    ? arrangeInstructions
    : _combineArrangeFns(arrangeInstructions)

  this.rows = []
}

XArrange.prototype['@@transducer/init'] = _xfBase.init
XArrange.prototype['@@transducer/result'] = function () {
  this.rows.sort(this.arrangeFn)

  return this.xf['@@transducer/result'](reduce(
    this.xf['@@transducer/step'].bind(this.xf),
    this.xf['@@transducer/init'](),
    this.rows
  ))
}
XArrange.prototype['@@transducer/step'] = function (acc, row) {
  this.rows.push(row)
}

function _combineArrangeFns (arrangeFns) {
  return function (a, b) {
    for (let i = 0; i < arrangeFns.length; i++) {
      const res = arrangeFns[i](a, b)
      if (res) return res
    }

    return -1
  }
}
