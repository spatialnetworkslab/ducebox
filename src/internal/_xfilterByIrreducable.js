// import _reduceObjVals from './_reduceObjVals.js'
import _xfBase from './_xfBase.js'
import { accumulator } from '../io/columnOriented.js'
import { _initStep, _initNestRow } from '../transformations/nestBy.js'
import _idFromCols from '../internal/_idFromCols.js'
import _stepCat from '../internal/_stepCat.js'

const _xfilterByIrreducable = (summariseFn, predicate, by, xf) => {
  return new XFilterByIrreducable(summariseFn, predicate, by, xf)
}

export default _xfilterByIrreducable

function XFilterByIrreducable (summariseFn, predicate, by, xf) {
  this.summariseFn = summariseFn
  this.predicate = predicate
  this.by = by
  this.xf = xf

  this.nestColName = Symbol('nested')
  this.getAccumulator = accumulator

  this.nestedColumns = []
  this.nestedDataById = {}
  this.accumulatorById = {}
  this.rows = []
  this.ids = []

  this.init = true
}

XFilterByIrreducable.prototype['@@transducer/init'] = _xfBase.init
XFilterByIrreducable.prototype['@@transducer/result'] = _result
XFilterByIrreducable.prototype['@@transducer/step'] = function (acc, row) {
  if (this.init) {
    this._initStep(acc, row)
    this.init = false
  }

  return this._step(acc, row)
}
XFilterByIrreducable.prototype._initStep = _initStep
XFilterByIrreducable.prototype._step = _step

function _result () {
  for (const id in this.nestedDataById) {
    const row = this.nestedDataById[id]

    const summarizedRow = this.summariseFn(row[this.nestColName])

    for (let i = 0; i < this.by.length; i++) {
      const byCol = this.by[i]
      summarizedRow[byCol] = row[byCol]
    }

    this.nestedDataById[id] = summarizedRow
  }

  this.summarizedDataById = this.nestedDataById
  this.nestedDataById = null

  let acc = this.xf['@@transducer/init']()
  let idx = 0
  const len = this.rows.length

  while (idx < len) {
    const row = this.rows[idx]
    const id = this.ids[idx]

    if (this.predicate(row, this.summarizedDataById[id])) {
      acc = this.xf['@@transducer/step'](acc, row)
    }

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value']
      break
    }

    idx++
  }

  return this.xf['@@transducer/result'](acc)
}

function _step (acc, row) {
  const id = _idFromCols(row, this.by)
  const newId = !(id in this.accumulatorById)

  this.rows.push(row)
  this.ids.push(id)

  if (newId) {
    this.accumulatorById[id] = _stepCat(this.getAccumulator())

    const nestRow = _initNestRow(
      row,
      this.nestColName,
      this.by,
      this.accumulatorById[id]['@@transducer/init']()
    )

    this.nestedDataById[id] = nestRow
  }

  const xf = this.accumulatorById[id]

  this.nestedDataById[id][this.nestColName] = xf['@@transducer/step'](
    this.nestedDataById[id][this.nestColName],
    this.select(row)
  )

  return acc
}
