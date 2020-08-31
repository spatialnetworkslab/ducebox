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

const transformations = forEachEntry(originalTransformations, curryTransformation)

function forEachEntry (object, fn) {
  const newObject = {}

  for (const key in object) {
    newObject[key] = fn(object[key])
  }

  return newObject
}

function curryTransformation (transformation) {
  return function (...args) {
    return function (data) {
      return transformation(data, ...args)
    }
  }
}

export { transformations }
