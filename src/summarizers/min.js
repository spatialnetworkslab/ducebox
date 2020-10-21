import { identity } from 'ramda'
import reduce from '../core/reduce.js'
import _dispatchableSummarizer from '../internal/_dispatchableSummarizer.js'

const init = () => Infinity
const result = identity
const step = (acc, val) => acc < val ? acc : val

const _xmin = () => ({
  '@@transducer/init': init,
  '@@transducer/result': result,
  '@@transducer/step': step
})

const min = _dispatchableSummarizer(_xmin, function (list) {
  return result(reduce(step, init(), list))
})

export default min
