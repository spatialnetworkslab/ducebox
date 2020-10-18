import { REDUCABLE } from './_symbols.js'

export default function _dispatchableSummarizer (transducerCreator, fn) {
  return function (...args) {
    if (args[0] === undefined) {
      return REDUCABLE
    }

    if (args[0] && args[0].constructor === String) {
      return {
        column: args[0],
        xf: transducerCreator()
      }
    }

    return fn(...args)
  }
}
