import { count as _count } from './count.js'
import { max as _max } from './max.js'
import { mean as _mean } from './mean.js'
import { median as _median } from './median.js'
import { min as _min } from './min.js'
import { mode as _mode } from './mode.js'
import { sum as _sum } from './sum.js'

function enableColumnNameSyntax (fn) {
  // These reducers all only take 1 argument, so we only need to check the first
  return function (arg) {
    if (arg.constructor === String) {
      return { [arg]: fn }
    }

    if (arg.constrctor === Array) {
      return fn(arg)
    }
  }
}

const count = enableColumnNameSyntax(_count)
const max = enableColumnNameSyntax(_max)
const mean = enableColumnNameSyntax(_mean)
const median = enableColumnNameSyntax(_median)
const min = enableColumnNameSyntax(_min)
const mode = enableColumnNameSyntax(_mode)
const sum = enableColumnNameSyntax(_sum)

export {
  count,
  max,
  mean,
  median,
  min,
  mode,
  sum
}
