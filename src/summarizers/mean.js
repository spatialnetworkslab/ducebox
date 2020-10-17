import _dispatchableSummarizer from '../internal/_dispatchableSummarizer.js'
import { reduce } from 'ramda'

const init = () => ({ count: 0, sum: 0 })
const result = result => result.sum / result.count
const step = (acc, val) => {
  acc.count++
  acc.sum += val

  return acc
}

const _xmean = () => ({
  '@@transducer/init': init,
  '@@transducer/result': result,
  '@@transducer/step': step
})

const mean = _dispatchableSummarizer(_xmean, function (list) {
  return result(reduce(step, init(), list))
})

export default mean
