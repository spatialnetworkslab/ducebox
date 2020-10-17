import { reduce } from '../index.js'
import _dispatchableSummarizer from '../internal/_dispatchableSummarizer.js'

const init = () => ({})

const result = acc => {
  let maxCount = 0
  let maxElement

  for (const element in acc) {
    const count = acc[element]

    if (maxCount < count) {
      maxCount = count
      maxElement = element
    }
  }

  return parseInt(maxElement)
}

const step = (acc, val) => {
  if (val in acc) {
    acc[val]++
  } else {
    acc[val] = 1
  }

  return acc
}

const _xmode = () => ({
  '@@transducer/init': init,
  '@@transducer/result': result,
  '@@transducer/step': step
})

const mode = _dispatchableSummarizer(_xmode, function (input) {
  return result(reduce(step, init(), input))
})

export default mode
