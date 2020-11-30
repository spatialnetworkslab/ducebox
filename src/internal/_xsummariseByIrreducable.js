import _reduceObjVals from './_reduceObjVals.js'
import _xfBase from './_xfBase.js'
import { _initStep, _step } from '../transformations/nestBy.js'
import { accumulator } from '../io/columnOriented.js'

const _xsummariseByIrreducable = (summariseFn, by, xf) => {
  return new XSummariseByIrreducable(summariseFn, by, xf)
}

export default _xsummariseByIrreducable

function XSummariseByIrreducable (summariseFn, by, xf) {
  this.summariseFn = summariseFn
  this.by = by
  this.xf = xf

  this.nestColName = Symbol('nested')
  this.getAccumulator = accumulator

  this.nestedColumns = []
  this.nestedDataById = {}
  this.accumulatorById = {}

  this.init = true
}

XSummariseByIrreducable.prototype['@@transducer/init'] = _xfBase.init
XSummariseByIrreducable.prototype['@@transducer/result'] = _result
XSummariseByIrreducable.prototype['@@transducer/step'] = function (acc, row) {
  if (this.init) {
    this._initStep(acc, row)
    this.init = false
  }

  return this._step(acc, row)
}
XSummariseByIrreducable.prototype._initStep = _initStep
XSummariseByIrreducable.prototype._step = _step
XSummariseByIrreducable.prototype._finalStep = _finalStep

export function _result () {
  return this.xf['@@transducer/result'](_reduceObjVals(
    this._finalStep.bind(this),
    this.xf['@@transducer/init'](),
    this.nestedDataById
  ))
}

function _finalStep (acc, row) {
  const summarizedRow = this.summariseFn(row[this.nestColName])

  for (let i = 0; i < this.by.length; i++) {
    const byCol = this.by[i]
    summarizedRow[byCol] = row[byCol]
  }

  return this.xf['@@transducer/step'](acc, summarizedRow)
}
