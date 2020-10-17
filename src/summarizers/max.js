import { identity } from 'ramda'
import { reduce } from '../index.js'
import _dispatchableSummarizer from '../internal/_dispatchableSummarizer.js'

const init = () => -Infinity
const result = identity
const step = (acc, val) => acc < val ? val : acc

const _xmax = () => ({
  '@@transducer/init': init,
  '@@transducer/result': result,
  '@@transducer/step': step
})

const max = _dispatchableSummarizer(_xmax, function (input) {
  return result(reduce(step, init(), input))
})

export default max
