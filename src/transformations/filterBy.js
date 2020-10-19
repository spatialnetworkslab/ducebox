import { curryN } from 'ramda'

import { into, reduce } from '../index.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'
import _idFromCols from '../internal/_idFromCols.js'
import { accumulator } from '../io/columnOriented.js'
import {
  _initStep as _initStepNestBy,
  _step as _stepNestBy
} from './nestBy.js'

const _xfilterBy = curryN(3, function _xfilterBy (getFilterFn, by, xf) {
  return new XFilterBy(getFilterFn, by, xf)
})

const filterBy = curryN(3, _dispatchable([], _xfilterBy,
  function (getFilterFn, by, df) {
    return into(
      [],
      filterBy(getFilterFn, by),
      df
    )
  }
))

export default filterBy

function XFilterBy (getFilterFn, by, xf) {
  this.getFilterFn = getFilterFn
  this.by = by
  this.xf = xf

  this.nestColName = Symbol('nested')
  this.getAccumulator = accumulator

  this.nestedColumns = []
  this.nestedDataById = {}
  this.accumulatorById = {}

  this['@@transducer/step'] = this._initStep
}

XFilterBy.prototype['@@transducer/init'] = _xfBase.init
XFilterBy.prototype['@@transducer/result'] = _result
XFilterBy.prototype._initStep = _initStep
XFilterBy.prototype._step = _step

function _result () {

}

function _initStep () {}

function _step () {}
