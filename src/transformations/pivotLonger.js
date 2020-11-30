import { curryN } from 'ramda'

import reduce from '../core/reduce.js'
import into from '../core/into.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'

const _xpivotLonger = curryN(2, function _xpivotLonger (pivotInstructions, xf) {
  return new XPivotLonger(pivotInstructions, xf)
})

const pivotLonger = curryN(2, _dispatchable([], _xpivotLonger,
  function (pivotInstructions, df) {
    return into(
      [],
      pivotLonger(pivotInstructions),
      df
    )
  }
))

export default pivotLonger

function XPivotLonger ({ columns, namesTo, valuesTo }, xf) {
  this.pivotColumns = columns
  this.pivotColumnsSet = new Set(columns)
  this.namesTo = namesTo
  this.valuesTo = valuesTo
  this.xf = xf

  this.columns = null
  this.idColumns = null

  this.init = true
}

XPivotLonger.prototype['@@transducer/init'] = _xfBase.init
XPivotLonger.prototype['@@transducer/result'] = _xfBase.result
XPivotLonger.prototype['@@transducer/step'] = function (acc, row) {
  if (this.init) {
    this._initStep(acc, row)
    this.init = false
  }

  return this._step(acc, row)
}
XPivotLonger.prototype._initStep = _initStep
XPivotLonger.prototype._step = _step

function _initStep (acc, row) {
  this.columns = Object.keys(row)

  this.idColumns = this.columns.filter(
    columnName => !this.pivotColumnsSet.has(columnName)
  )
}

function _step (acc, row) {
  const newRows = []

  for (let j = 0; j < this.pivotColumns.length; j++) {
    const newRow = {}

    const pivotColumnName = this.pivotColumns[j]
    const pivotColumnValue = row[pivotColumnName]

    newRow[this.namesTo] = pivotColumnName
    newRow[this.valuesTo] = pivotColumnValue

    for (let k = 0; k < this.idColumns.length; k++) {
      const idColumnName = this.idColumns[k]
      newRow[idColumnName] = row[idColumnName]
    }

    console.log(newRow)

    newRows.push(newRow)
  }

  return reduce(
    this.xf['@@transducer/step'].bind(this.xf),
    acc,
    newRows
  )
}
