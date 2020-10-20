import { curryN } from 'ramda'

import { reduce, into } from '../index.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'

const _xunnest = curryN(3, function _xunnest (nestColName, nestWrapper, xf) {
  return new XUnnest(nestColName, nestWrapper, xf)
})

const unnest = curryN(3, _dispatchable([], _xunnest,
  function (nestColName, nestWrapper, df) {
    return into(
      [],
      unnest(nestColName, nestWrapper),
      df
    )
  }
))

export default unnest

function XUnnest (nestColName, nestWrapper, xf) {
  this.nestColName = nestColName
  this.nestWrapper = nestWrapper
  this.xf = xf
  this.outerColumns = []

  this['@@transducer/step'] = this._initStep
}

XUnnest.prototype['@@transducer/init'] = _xfBase.init
XUnnest.prototype['@@transducer/result'] = _xfBase.result

XUnnest.prototype._initStep = function (acc, row) {
  for (const columnName in row) {
    if (columnName !== this.nestColName) {
      this.outerColumns.push(columnName)
    }
  }

  this['@@transducer/step'] = this._step
  return this['@@transducer/step'](acc, row)
}

XUnnest.prototype._step = function (acc, row) {
  const nestedData = row[this.nestColName]

  const rowWithoutNested = Object.assign({}, row)
  delete rowWithoutNested[this.nestColName]

  return reduce(
    (innerAcc, innerRow) => this.xf[['@@transducer/step']](
      innerAcc,
      _attach(innerRow, rowWithoutNested)
    ),
    acc,
    this.nestWrapper(nestedData)
  )
}

function _attach (innerRow, outerRow) {
  const newRow = Object.assign({}, innerRow)

  for (const columnName in outerRow) {
    newRow[columnName] = outerRow[columnName]
  }

  return newRow
}
