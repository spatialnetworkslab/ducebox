import { forEachEntry } from '../utils/forEach.js'
import { curryTransformation } from '../utils/curry.js'

import { filter } from './filter.js'
import { mutate, transmute } from './mutate.js'
import { rename } from './rename.js'
import { select } from './select.js'
import { slice } from './slice.js'

const originalTransformations = {
  filter,
  mutate,
  rename,
  select,
  slice,
  transmute
}

const transformations = forEachEntry(
  originalTransformations,
  curryTransformation
)

export { transformations }
