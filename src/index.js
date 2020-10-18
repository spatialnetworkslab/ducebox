// compare functions
// TODO fix this
// export * from './compare/index.js'

// core
// TODO have own functions here
export {
  compose,
  into,
  reduce,
  transduce
} from 'ramda'

// io
export * as columnOriented from './io/columnOriented.js'

// summarizers
export { default as count } from './summarizers/count.js'
export { default as max } from './summarizers/max.js'
export { default as mean } from './summarizers/mean.js'
export { default as median } from './summarizers/median.js'
export { default as min } from './summarizers/min.js'
export { default as mode } from './summarizers/mode.js'
export { default as sum } from './summarizers/sum.js'

// transformations
export { filter } from 'ramda'
export { default as mutate } from './transformations/mutate.js'
export { default as nestBy } from './transformations/nestBy.js'
export { default as select } from './transformations/select.js'
export { default as slice } from './transformations/slice.js'
export { default as summariseBy } from './transformations/summariseBy.js'
export { default as unnest } from './transformations/unnest.js'
