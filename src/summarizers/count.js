import { identity } from 'ramda'
import reduce from '../core/reduce.js'
import _dispatchableSummarizer from '../internal/_dispatchableSummarizer.js'
import _isArrayLike from '../internal/_isArrayLike.js'

const init = () => 0
const result = identity
const step = acc => acc + 1

const _xcount = () => ({
  '@@transducer/init': init,
  '@@transducer/result': result,
  '@@transducer/step': step
})

const count = _dispatchableSummarizer(_xcount, function count (list) {
  return _isArrayLike(list)
    ? list.length
    : result(reduce(step, init(), list))
})

export default count
