import { nest } from './nest.js'

export function filterBy (data, getCondition, by) {
  const nestedData = nest(data, '$nested', by)
}
