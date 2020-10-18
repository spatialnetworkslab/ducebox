import _idFromCols from './_idFromCols.js'
import _xfBase from './_xfBase.js'

function XSummariseByReducable (f, by, xf) {
  this.instructions = _getReducableInstructions(f)
  this.by = by
  this.xf = xf

  this.acc = {}
}

XSummariseByReducable.prototype['@@transducer/init'] = _xfBase.init

XSummariseByReducable.prototype['@@transducer/result'] = result => {

}

XSummariseByReducable.prototype['@@transducer/step'] = (result, input) => {
  const id = _idFromCols(input, this.by)
}

function _getReducableInstructions (f) {
  const columnProxy = new Proxy({}, { get (_, prop) { return prop } })
  return f(columnProxy)
}

function _initSummaryGroup (instructions) {
  const acc = {}

  for (const newColumn in instructions) {
    const instruction = instructions[newColumn]
    acc[newColumn] = instruction.xf['@@transducer/init']
  }

  return acc
}

function _stepSummaryGroup (summaryGroup, instructions) {

}
