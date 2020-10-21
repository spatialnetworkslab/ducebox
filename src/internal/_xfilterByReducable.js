import _xfBase from './_xfBase.js'
import _idFromCols from './_idFromCols.js'
import {
  _getReducableInstructions,
  _initSummaryGroup,
  _updateSummaryGroup
} from './_xsummariseByReducable.js'

const _xfilterByReducable = (summariseFn, predicate, by, xf) => {
  return new XFilterByReducable(summariseFn, predicate, by, xf)
}

export default _xfilterByReducable

function XFilterByReducable (summariseFn, predicate, by, xf) {
  this.instructions = _getReducableInstructions(summariseFn)
  this.predicate = predicate
  this.by = by
  this.xf = xf

  this.summarizedDataById = {}
  this.rows = []
  this.ids = []
}

XFilterByReducable.prototype['@@transducer/init'] = _xfBase.init
XFilterByReducable.prototype['@@transducer/result'] = _result
XFilterByReducable.prototype['@@transducer/step'] = _step

function _result () {
  for (const id in this.summarizedDataById) {
    for (const newColumnName in this.instructions) {
      const resultFn = this
        .instructions[newColumnName]
        .xf['@@transducer/result']

      this.summarizedDataById[id][newColumnName] = resultFn(
        this.summarizedDataById[id][newColumnName]
      )
    }
  }

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
  const newId = !(id in this.summarizedDataById)

  this.rows.push(row)
  this.ids.push(id)

  if (newId) {
    this.summarizedDataById[id] = _initSummaryGroup(
      this.instructions,
      row,
      this.by
    )
  }

  this.summarizedDataById[id] = _updateSummaryGroup(
    this.summarizedDataById[id],
    this.instructions,
    row
  )

  return acc
}
