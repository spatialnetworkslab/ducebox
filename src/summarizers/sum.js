import { identity } from 'ramda'
import reduce from '../core/reduce.js'
import _dispatchableSummarizer from '../internal/_dispatchableSummarizer.js'

const init = () => 0
const result = identity
const step = (acc, val) => acc + val

const _xsum = () => ({
  '@@transducer/init': init,
  '@@transducer/result': result,
  '@@transducer/step': step
})

const sum = _dispatchableSummarizer(_xsum, function (list) {
  return result(reduce(step, init(), list))
})

export default sum
