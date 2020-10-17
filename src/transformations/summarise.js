import { curryN } from 'ramda'

import { REDUCIBLE } from '../symbols.js'
import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'

function XSummariseReducible (f, by, xf) {
  this.instructions = _getReducibleInstructions(f)
  this.by = by
  this.xf = xf
}

XSummariseReducible.prototype['@@transducer/init'] = _xfBase.init

XSummariseReducible.prototype['@@transducer/result'] = result => {

}

XSummariseReducible.prototype['@@transducer/step'] = (acc, val) => {

}

function XSummariseIrreducible (f, by, xf) {
  this.f = f
  this.by = by
  this.xf = xf
}

XSummariseIrreducible.prototype['@@transducer/init'] = _xfBase.init

XSummariseReducible.prototype['@@transducer/result'] = result => {

}

XSummariseReducible.prototype['@@transducer/step'] = (acc, val) => {

}

const _xsummarise = (f, by, xf) => {
  return _isReducible(f)
    ? new XSummariseReducible(f, by, xf)
    : new XSummariseIrreducible(f, by, xf)
}

const summarise = curryN(3, _dispatchable([], _xsummarise, function (f, by, list) {}))

export default summarise

function _isReducible (f) {
  try {
    const summariseInstructions = f({})

    for (const newColumnName in summariseInstructions) {
      if (summariseInstructions[newColumnName] !== REDUCIBLE) {
        return false
      }
    }
  } catch (e) {
    return false
  }

  return true
}

function _getReducibleInstructions (f) {
  const columnProxy = new Proxy({}, { get (_, prop) { return prop } })
  return f(columnProxy)
}
