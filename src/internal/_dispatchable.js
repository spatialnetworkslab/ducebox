// Adapted from ramda: https://github.com/ramda/ramda
import _isArray from './_isArray.js'
import _isTransformer from './_isTransformer.js'

export default function _dispatchable (methodNames, transducerCreator, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn()
    }
    const obj = arguments[arguments.length - 1]

    if (!_isArray(obj)) {
      let idx = 0
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1))
        }
        idx += 1
      }
      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1))
        return transducer(obj)
      }
    }
    return fn.apply(this, arguments)
  }
}
