import { arrange } from './arrange.js'
import { filter } from './filter.js'
import { filterBy } from './filterBy.js'
import { mutate, transmute } from './mutate.js'
import { nestBy } from './nestBy.js'
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
filterBy = curryTransformation(filterBy)
mutate = curryTransformation(mutate)
nestBy = curryTransformation(nestBy)
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
  filterBy,
  mutate,
  nestBy,
  pivotLonger,
  pivotWider,
  rename,
  select,
  slice,
  summarise,
  summariseBy,
  transmute
}
