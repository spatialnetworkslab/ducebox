import { curryN } from 'ramda'

import _reduceObjVals from '../internal/_reduceObjVals.js'
import into from '../core/into.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'
import _idFromCols from '../internal/_idFromCols.js'

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

  this.idColumns = null
  this.widerRowsById = {}
  this.newColumnsSet = new Set()
  this.newColumns = null

  this.init = true
}

XPivotWider.prototype['@@transducer/init'] = _xfBase.init
XPivotWider.prototype['@@transducer/result'] = _result
XPivotWider.prototype['@@transducer/step'] = function (acc, row) {
  if (this.init) {
    this._initStep(acc, row)
    this.init = false
  }

  return this._step(acc, row)
}
XPivotWider.prototype._initStep = _initStep
XPivotWider.prototype._step = _step
XPivotWider.prototype._finalStep = _finalStep

function _result () {
  this.newColumns = Array.from(this.newColumnsSet)

  return this.xf['@@transducer/result'](_reduceObjVals(
    this._finalStep.bind(this),
    this.xf['@@transducer/init'](),
    this.widerRowsById
  ))
}

function _initStep (acc, row) {
  const columns = Object.keys(row)
  const nonIdColumns = [this.namesFrom, this.valuesFrom]
  this.idColumns = columns.filter(c => !nonIdColumns.includes(c))
}

function _step (acc, row) {
  const id = _idFromCols(row, this.idColumns)
  const newId = !(id in this.widerRowsById)

  if (newId) {
    const widerRow = {}

    for (let i = 0; i < this.idColumns.length; i++) {
      const idColumn = this.idColumns[i]
      widerRow[idColumn] = row[idColumn]
    }

    this.widerRowsById[id] = widerRow
  }

  const column = row[this.namesFrom]
  const value = row[this.valuesFrom]

  this.widerRowsById[id][column] = value
  this.newColumnsSet.add(column)
}

function _finalStep (acc, row) {
  for (let i = 0; i < this.newColumns.length; i++) {
    const newColumn = this.newColumns[i]

    if (!(newColumn in row)) {
      row[newColumn] = this.valuesFill
    }
  }

  return this.xf['@@transducer/step'](acc, row)
}
