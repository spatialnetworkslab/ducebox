import { forEachEntry } from '../utils/forEach.js'
import { enableColumnNameSyntax } from '../utils/curry.js'

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

const reducers = forEachEntry(
  originalReducers,
  enableColumnNameSyntax
)

export { reducers }
