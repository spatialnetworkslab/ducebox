import { count, foldableCount } from './count.js'
import { max, foldableMax } from './max.js'
import { mean, foldableMean } from './mean.js'
import { median } from './median.js'
import { min, foldableMin } from './min.js'
import { mode, foldableMode } from './mode.js'
import { sum, foldableSum } from './sum.js'

import { FOLDABLE_REDUCER } from '../symbols.js'

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

count = enableColumnNameSyntax(count)
max = enableColumnNameSyntax(max)
mean = enableColumnNameSyntax(mean)
median = enableColumnNameSyntax(median)
min = enableColumnNameSyntax(min)
mode = enableColumnNameSyntax(mode)
sum = enableColumnNameSyntax(sum)

function attachFoldableVersion (transformation, foldableVersion) {
  transformation[FOLDABLE_REDUCER] = foldableVersion
  return transformation
}

count = attachFoldableVersion(count, foldableCount)
max = attachFoldableVersion(max, foldableMax)
mean = attachFoldableVersion(mean, foldableMean)
min = attachFoldableVersion(min, foldableMin)
mode = attachFoldableVersion(mode, foldableMode)
sum = attachFoldableVersion(sum, foldableSum)

export {
  count,
  max,
  mean,
  median,
  min,
  mode,
  sum
}
