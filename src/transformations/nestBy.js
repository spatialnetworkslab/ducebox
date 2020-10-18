import { curryN } from 'ramda'

import { into, reduce } from '../index.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'
import _idFromCols from '../internal/_idFromCols.js'
import _stepCat from '../internal/_stepCat.js'

function XNestBy (nestColName, nestAcc, by, xf) {
  this.nestColName = nestColName
  this.nestAcc = _stepCat(nestAcc)
  this.by = by
  this.xf = xf

  this.nestedColumns = []
  this.nestedDataById = {}

  this['@@transducer/step'] = this._initStep
}

XNestBy.prototype['@@transducer/init'] = _xfBase.init

XNestBy.prototype['@@transducer/result'] = function () {
  const result = this.xf['@@transducer/result'](reduce(
    this.xf['@@transducer/step'].bind(this.xf),
    this.xf['@@transducer/init'](),
    Object.values(this.nestedDataById)
  ))

  this.nestedDataById = null

  return result
}

XNestBy.prototype._initStep = function (acc, row) {
  const bySet = new Set(this.by)

  for (const columnName in row) {
    if (!bySet.has(columnName)) {
      this.nestedColumns.push(columnName)
    }
  }

  this['@@transducer/step'] = this._step
  return this['@@transducer/step'](acc, row)
}

XNestBy.prototype._step = function (acc, row) {
  const id = _idFromCols(row, this.by)
  const newId = !(id in this.nestedDataById)

  if (newId) {
    this.nestedDataById[id] = _initNestedGroup(
      row,
      this.nestColName,
      this.by,
      this.nestAcc['@@transducer/init']()
    )
  }

  this.nestedDataById[id][this.nestColName] = this.nestAcc['@@transducer/step'](
    this.nestedDataById[id][this.nestColName],
    _select(row, this.nestedColumns)
  )

  return acc
}

const _xnestBy = curryN(4, function _xnestBy (nestColName, nestAcc, by, xf) {
  return new XNestBy(nestColName, nestAcc, by, xf)
})

const nestBy = curryN(4, _dispatchable([], _xnestBy,
  function (nestColName, nestAcc, by, df) {
    return into(
      [],
      nestBy(nestColName, nestAcc, by),
      df
    )
  }
))

export default nestBy

function _initNestedGroup (row, nestColName, by, initVal) {
  const nestedGroup = {}

  for (let i = 0; i < by.length; i++) {
    const colName = by[i]
    nestedGroup[colName] = row[colName]
  }

  nestedGroup[nestColName] = initVal

  return nestedGroup
}

function _select (row, columnNames) {
  const newRow = {}

  for (let i = 0; i < columnNames.length; i++) {
    const columnName = columnNames[i]
    newRow[columnName] = row[columnName]
  }

  return newRow
}
