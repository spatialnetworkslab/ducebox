import { identity } from 'ramda'
import { reduce } from '../index.js'
import _dispatchableSummarizer from '../internal/_dispatchableSummarizer.js'

const init = () => 0
const result = identity
const step = (acc, val) => acc + val

const _xsum = () => ({
  '@@transducer/init': init,
  '@@transducer/result': result,
  '@@transducer/step': step
})

const sum = _dispatchableSummarizer(_xsum, function (input) {
  return result(reduce(step, init(), input))
})

export default sum

// import { enableColumnNameSyntax, attachFoldableVersion } from './_curry.js'

// let sum = function (array) {
//   let total = 0

//   for (let i = 0; i < array.length; i++) {
//     total += array[i]
//   }

//   return total
// }

// const foldableSum = {
//   startValue: 0,
//   fold (currentValue, previousValue) {
//     return previousValue + currentValue
//   },
//   finally (value, length) {
//     return value
//   }
// }

// sum = enableColumnNameSyntax(sum)
// sum = attachFoldableVersion(sum, foldableSum)

// export { sum }
