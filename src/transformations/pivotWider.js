import { curryN, into, reduce } from 'ramda'

import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'

const _xpivotWider = curryN(2, function _xpivotWider (pivotInstructions, xf) {
  return new XPivotWider(pivotInstructions, xf)
})

const pivotWider = curryN(2, _dispatchable([], _xpivotWider,
  function (pivotInstructions, df) {
    return into(
      [],
      pivotWider(pivotInstructions),
      df
    )
  }
))

export default pivotWider

function XPivotWider ({ namesFrom, valuesFrom, valuesFill = null }, xf) {
  this.namesFrom = namesFrom
  this.valuesFrom = valuesFrom
  this.valuesFill = valuesFill
  this.xf = xf
}

XPivotWider.prototype['@@transducer/init'] = _xfBase.init
XPivotWider.prototype['@@transducer/result'] = _result
XPivotWider.prototype._initStep = _initStep
XPivotWider.prototype._step = _step

function _result () {}

function _initStep () {}

function _step () {}
