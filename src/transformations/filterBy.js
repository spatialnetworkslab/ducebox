import { curryTransformation } from './_curry.js'
import { getNrow, getId } from '../utils/misc.js'
import { initNewData, filter } from './filter.js'
import { nest } from './nest.js'

let filterBy = function (data, getCondition, by = []) {
  if (by.length === 0) {
    return filter(getCondition(data))(data)
  }

  const nestedData = nest('$nested', by)(data)
  const nestedNrow = getNrow(nestedData)

  const conditionPerGroup = {}

  for (let i = 0; i < nestedNrow; i++) {
    const id = getId(nestedData, i, by)
    conditionPerGroup[id] = getCondition(nestedData.$nested[i])
  }

  const nrow = getNrow(data)
  const row = {}
  const newData = initNewData(data)

  for (let i = 0; i < nrow; i++) {
    const id = getId(data, i, by)
    const condition = conditionPerGroup[id]

    for (const columnName in data) {
      row[columnName] = data[columnName][i]
    }

    if (condition(row, i)) {
      for (const columnName in data) {
        newData[columnName].push(row[columnName])
      }
    }
  }

  return newData
}

filterBy = curryTransformation(filterBy)

export { filterBy }
