import { reduce } from '../index.js'
import _idFromCols from './_idFromCols.js'
import _xfBase from './_xfBase.js'

const _xsummarisebyReducable = (f, by, xf) => new XSummariseByReducable(f, by, xf)

export default _xsummarisebyReducable

function XSummariseByReducable (f, by, xf) {
  this.instructions = _getReducableInstructions(f)
  this.by = by
  this.xf = xf

  this.summarizedDataById = {}
}

XSummariseByReducable.prototype['@@transducer/init'] = _xfBase.init

XSummariseByReducable.prototype['@@transducer/result'] = function () {
  const result = this.xf['@@transducer/result'](reduce(
    this._finalStep.bind(this),
    this.xf['@@transducer/init'](),
    Object.values(this.summarizedDataById)
  ))

  this.summarizedDataById = null

  return result
}

XSummariseByReducable.prototype['@@transducer/step'] = function (acc, row) {
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

XSummariseByReducable.prototype._finalStep = function (acc, row) {
  for (const newColumnName in this.instructions) {
    row[newColumnName] = this
      .instructions[newColumnName]
      .xf['@@transducer/result'](row[newColumnName])
  }

  return this.xf['@@transducer/step'](acc, row)
}

function _getReducableInstructions (f) {
  const columnProxy = new Proxy({}, { get (_, prop) { return prop } })
  return f(columnProxy)
}

function _initSummaryGroup (instructions, row, by) {
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

function _updateSummaryGroup (summaryGroup, instructions, row) {
  for (const newColumnName in instructions) {
    const instruction = instructions[newColumnName]

    summaryGroup[newColumnName] = instruction.xf['@@transducer/step'](
      summaryGroup[newColumnName],
      row[instruction.column]
    )
  }

  return summaryGroup
}
