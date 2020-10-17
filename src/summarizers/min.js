import { identity } from 'ramda'
import { reduce } from '../index.js'
import _dispatchableSummarizer from '../internal/_dispatchableSummarizer.js'

const init = () => Infinity
const result = identity
const step = (acc, val) => acc < val ? acc : val

const _xmin = () => ({
  '@@transducer/init': init,
  '@@transducer/result': result,
  '@@transducer/step': step
})

const min = _dispatchableSummarizer(_xmin, function (input) {
  return result(reduce(step, init(), input))
})

export default min
