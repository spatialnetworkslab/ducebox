import { reduce, curryN, compose, into } from 'ramda'

import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'

function XUnnest (nestColName, nestWrapper, xf) {
  this.nestColName = nestColName
  this.nestWrapper = nestWrapper
  this.xf = xf
  this.outerColumns = []

  this['@@transducer/step'] = this._initStep
}

XUnnest.prototype['@@transducer/init'] = _xfBase.init
XUnnest.prototype['@@transducer/result'] = _xfBase.result

XUnnest.prototype._initStep = function (result, input) {
  for (const columnName in input) {
    if (columnName !== this.nestColName) {
      this.outerColumns.push(columnName)
    }
  }

  this['@@transducer/step'] = this._step
  return this['@@transducer/step'](result, input)
}

XUnnest.prototype._step = function (outerResult, outerInput) {
  const nestedData = outerInput[this.nestColName]

  const outerInputWithoutNested = Object.assign({}, outerInput)
  delete outerInputWithoutNested[this.nestColName]

  return reduce(
    (innerResult, innerInput) => this.xf[['@@transducer/step']](
      innerResult,
      _attach(innerInput, outerInputWithoutNested)
    ),
    outerResult,
    this.nestWrapper(nestedData)
  )
}

var _xunnest = curryN(3, function _xunnest (nestColName, nestWrapper, xf) {
  return new XUnnest(nestColName, nestWrapper, xf)
})

var unnest = curryN(3, _dispatchable([], _xunnest,
  function (nestColName, nestWrapper, list) {
    return into(
      [],
      compose(unnest(nestColName, nestWrapper)),
      list
    )
  }
))

export default unnest

function _attach (innerRow, outerRow) {
  const newRow = Object.assign({}, innerRow)

  for (const columnName in outerRow) {
    newRow[columnName] = outerRow[columnName]
  }

  return newRow
}
