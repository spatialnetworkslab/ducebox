import _xfBase from './_xfBase.js'
import { _result, _initStep, _step } from '../transformations/nestBy.js'
import { accumulator } from '../io/columnOriented.js'

const _xsummarisebyIrreducable = (f, by, xf) => new XSummariseByIrreducable(f, by, xf)

export default _xsummarisebyIrreducable

function XSummariseByIrreducable (f, by, xf) {
  this.f = f
  this.by = by
  this.xf = xf

  this.nestColName = Symbol('nested')
  this.getAccumulator = accumulator

  this.nestedColumns = []
  this.nestedDataById = {}
  this.accumulatorById = {}

  this['@@transducer/step'] = this._initStep
}

XSummariseByIrreducable.prototype['@@transducer/init'] = _xfBase.init
XSummariseByIrreducable.prototype['@@transducer/result'] = _result
XSummariseByIrreducable.prototype._initStep = _initStep
XSummariseByIrreducable.prototype._step = _step
XSummariseByIrreducable.prototype._finalStep = function (acc, row) {
  const summarizedRow = this.f(row[this.nestColName])

  for (let i = 0; i < this.by.length; i++) {
    const byCol = this.by[i]
    summarizedRow[byCol] = row[byCol]
  }

  return this.xf['@@transducer/step'](acc, summarizedRow)
}
