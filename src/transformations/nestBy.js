import { curryN } from 'ramda'

import { into, reduce } from '../index.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'
import _idFromCols from '../internal/_idFromCols.js'
import _stepCat from '../internal/_stepCat.js'
import { _getSelectFn } from './select.js'

const _xnestBy = curryN(3, function _xnestBy (nestInstructions, by, xf) {
  return new XNestBy(nestInstructions, by, xf)
})

const nestBy = curryN(3, _dispatchable([], _xnestBy,
  function (nestInstructions, by, df) {
    return into(
      [],
      nestBy(nestInstructions, by),
      df
    )
  }
))

export default nestBy

function XNestBy (nestInstructions, by, xf) {
  const nestInstructionsIsObj = nestInstructions.constructor === Object

  this.nestColName = nestInstructionsIsObj
    ? nestInstructions.column
    : nestInstructions

  this.getAccumulator = nestInstructionsIsObj && nestInstructions.getAccumulator
    ? nestInstructions.getAccumulator
    : () => []

  this.by = by
  this.xf = xf

  this.select = null
  this.nestedData = []
  this.idtoRowNumber = {}
  this.accumulatorById = {}
  this.currentRow = 0

  this['@@transducer/step'] = this._initStep
}

XNestBy.prototype['@@transducer/init'] = _xfBase.init
XNestBy.prototype['@@transducer/result'] = _result
XNestBy.prototype._initStep = _initStep
XNestBy.prototype._step = _step

export function _result () {
  const result = this.xf['@@transducer/result'](reduce(
    this.xf['@@transducer/step'].bind(this.xf),
    this.xf['@@transducer/init'](),
    this.nestedData
  ))

  this.nestedData = null
  this.accumulatorById = null
  this.idtoRowNumber = null

  return result
}

export function _initStep (acc, row) {
  const bySet = new Set(this.by)
  const nestedColumns = []

  for (const columnName in row) {
    if (!bySet.has(columnName)) {
      nestedColumns.push(columnName)
    }
  }

  this.select = _getSelectFn(nestedColumns)

  this['@@transducer/step'] = this._step
  return this['@@transducer/step'](acc, row)
}

export function _step (acc, row) {
  const id = _idFromCols(row, this.by)
  const newId = !(id in this.accumulatorById)

  if (newId) {
    this.accumulatorById[id] = _stepCat(this.getAccumulator())

    const nestRow = _initNestRow(
      row,
      this.nestColName,
      this.by,
      this.accumulatorById[id]['@@transducer/init']()
    )

    this.nestedData.push(nestRow)
    this.idtoRowNumber[id] = this.currentRow
    this.currentRow++
  }

  const rowNumber = this.idtoRowNumber[id]

  this.nestedData[rowNumber][this.nestColName] = this.accumulatorById[id]['@@transducer/step'](
    this.nestedData[rowNumber][this.nestColName],
    this.select(row)
  )

  return acc
}

function _initNestRow (row, nestColName, by, initVal) {
  const nestedGroup = {}

  for (let i = 0; i < by.length; i++) {
    const colName = by[i]
    nestedGroup[colName] = row[colName]
  }

  nestedGroup[nestColName] = initVal

  return nestedGroup
}
