import { forEachEntry } from '../utils/forEach.js'

import { count } from './count.js'
import { max } from './max.js'
import { mean } from './mean.js'
import { median } from './median.js'
import { min } from './min.js'
import { mode } from './mode.js'
import { sum } from './sum.js'

const originalReducers = {
  count,
  max,
  mean,
  median,
  min,
  mode,
  sum
}

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

const reducers = forEachEntry(
  originalReducers,
  enableColumnNameSyntax
)

export { reducers }
