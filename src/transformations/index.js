import { arrange as _arrange } from './arrange.js'
import { filter as _filter } from './filter.js'
import { mutate as _mutate, transmute as _transmute } from './mutate.js'
import { rename as _rename } from './rename.js'
import { select as _select } from './select.js'
import { slice as _slice } from './slice.js'

function curryTransformation (transformation) {
  return function (...args) {
    return function (data) {
      return transformation(data, ...args)
    }
  }
}

const arrange = curryTransformation(_arrange)
const filter = curryTransformation(_filter)
const mutate = curryTransformation(_mutate)
const rename = curryTransformation(_rename)
const select = curryTransformation(_select)
const slice = curryTransformation(_slice)
const transmute = curryTransformation(_transmute)

export {
  arrange,
  filter,
  mutate,
  rename,
  select,
  slice,
  transmute
}
