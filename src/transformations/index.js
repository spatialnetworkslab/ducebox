import { forEachEntry } from '../utils/forEach.js'

import { arrange } from './arrange.js'
import { filter } from './filter.js'
import { mutate, transmute } from './mutate.js'
import { rename } from './rename.js'
import { select } from './select.js'
import { slice } from './slice.js'

const originalTransformations = {
  arrange,
  filter,
  mutate,
  rename,
  select,
  slice,
  transmute
}

export function curryTransformation (transformation) {
  return function (...args) {
    return function (data) {
      return transformation(data, ...args)
    }
  }
}

const transformations = forEachEntry(
  originalTransformations,
  curryTransformation
)

export { transformations }
