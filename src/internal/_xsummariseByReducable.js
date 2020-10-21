import _reduceObjVals from './_reduceObjVals.js'
import _idFromCols from './_idFromCols.js'
import _xfBase from './_xfBase.js'

const _xsummariseByReducable = (summariseFn, by, xf) => {
  return new XSummariseByReducable(summariseFn, by, xf)
}

export default _xsummariseByReducable

function XSummariseByReducable (summariseFn, by, xf) {
  this.instructions = _getReducableInstructions(summariseFn)
  this.by = by
  this.xf = xf

  this.summarizedDataById = {}
}

export function _getReducableInstructions (f) {
  const columnProxy = new Proxy({}, { get (_, prop) { return prop } })
  return f(columnProxy)
}

XSummariseByReducable.prototype['@@transducer/init'] = _xfBase.init
XSummariseByReducable.prototype['@@transducer/result'] = _result
XSummariseByReducable.prototype['@@transducer/step'] = _step
XSummariseByReducable.prototype._finalStep = _finalStep

function _result () {
  return this.xf['@@transducer/result'](_reduceObjVals(
    this._finalStep.bind(this),
    this.xf['@@transducer/init'](),
    this.summarizedDataById
  ))
}

function _step (acc, row) {
  const id = _idFromCols(row, this.by)
  const newId = !(id in this.summarizedDataById)

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

function _finalStep (acc, row) {
  for (const newColumnName in this.instructions) {
    row[newColumnName] = this
      .instructions[newColumnName]
      .xf['@@transducer/result'](row[newColumnName])
  }

  return this.xf['@@transducer/step'](acc, row)
}

export function _initSummaryGroup (instructions, row, by) {
  const summaryGroup = {}

  for (const newColumnName in instructions) {
    const instruction = instructions[newColumnName]
    summaryGroup[newColumnName] = instruction.xf['@@transducer/init']()
  }

  for (let i = 0; i < by.length; i++) {
    const byCol = by[i]
    summaryGroup[byCol] = row[byCol]
  }

  return summaryGroup
}

export function _updateSummaryGroup (summaryGroup, instructions, row) {
  for (const newColumnName in instructions) {
    const instruction = instructions[newColumnName]

    summaryGroup[newColumnName] = instruction.xf['@@transducer/step'](
      summaryGroup[newColumnName],
      row[instruction.column]
    )
  }

  return summaryGroup
}
