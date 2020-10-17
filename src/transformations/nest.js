import _dispatchable from './internal/_dispatchable.js'
import _xfBase from './internal/_xfBase.js'
import _idFromCols from './internal/_idFromCols.js'
import _stepCat from './internal/_stepCat.js'

import { curryN, compose, into, reduce } from 'ramda'

function XNest (nestColName, nestAcc, by, xf) {
  this.nestColName = nestColName
  this.nestAcc = _stepCat(nestAcc)
  this.by = by
  this.xf = xf
  this.nestedColumns = []
  this.inputs = {}

  this['@@transducer/step'] = this._initStep
}

XNest.prototype['@@transducer/init'] = _xfBase.init
XNest.prototype['@@transducer/result'] = function () {
  const final = this.xf['@@transducer/result'](reduce(
    (result, key) => this.xf['@@transducer/step'](result, this.inputs[key]),
    this.xf['@@transducer/init'](),
    Object.keys(this.inputs)
  ))

  this.inputs = null
  return final
}

XNest.prototype._initStep = function (result, input) {
  const bySet = new Set(this.by)

  for (const columnName in input) {
    if (!bySet.has(columnName)) {
      this.nestedColumns.push(columnName)
    }
  }

  this['@@transducer/step'] = this._step
  return this['@@transducer/step'](result, input)
}

XNest.prototype._step = function (result, input) {
  const id = _idFromCols(input, this.by)
  const newId = !(id in this.inputs)

  if (newId) {
    const outerRow = {}

    for (let i = 0; i < this.by.length; i++) {
      const colName = this.by[i]
      outerRow[colName] = input[colName]
    }

    outerRow[this.nestColName] = this.nestAcc['@@transducer/init']()
    this.inputs[id] = outerRow
  }

  this.inputs[id][this.nestColName] = this.nestAcc['@@transducer/step'](
    this.inputs[id][this.nestColName],
    _select(input, this.nestedColumns)
  )

  return result
}

var _xnest = curryN(4, function _xnest (nestColName, nestAcc, by, xf) {
  return new XNest(nestColName, nestAcc, by, xf)
})

var nest = curryN(4, _dispatchable([], _xnest,
  function (nestColName, nestAcc, by, list) {
    return into(
      [],
      compose(nest(nestColName, nestAcc, by)),
      list
    )
  }
))

export default nest

function _select (row, columnNames) {
  const newRow = {}

  for (let i = 0; i < columnNames.length; i++) {
    const columnName = columnNames[i]
    newRow[columnName] = row[columnName]
  }

  return newRow
}
