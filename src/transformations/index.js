import { arrange } from './arrange.js'
import { filter } from './filter.js'
import { mutate, transmute } from './mutate.js'
import { pivotLonger } from './pivotLonger.js'
import { pivotWider } from './pivotWider.js'
import { rename } from './rename.js'
import { select } from './select.js'
import { slice } from './slice.js'
import { summarise } from './summarise.js'
import { summariseBy } from './summariseBy.js'

function curryTransformation (transformation) {
  return function (...args) {
    return function (data) {
      return transformation(data, ...args)
    }
  }
}

arrange = curryTransformation(arrange)
filter = curryTransformation(filter)
mutate = curryTransformation(mutate)
pivotLonger = curryTransformation(pivotLonger)
pivotWider = curryTransformation(pivotWider)
rename = curryTransformation(rename)
select = curryTransformation(select)
slice = curryTransformation(slice)
summarise = curryTransformation(summarise)
summariseBy = curryTransformation(summariseBy)
transmute = curryTransformation(transmute)

export {
  arrange,
  filter,
  mutate,
  pivotLonger,
  pivotWider,
  rename,
  select,
  slice,
  summarise,
  summariseBy,
  transmute
}
