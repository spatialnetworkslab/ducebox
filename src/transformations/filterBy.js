import { getDataLength, getId } from '../utils'
import { initNewData } from './filter.js'
import { nest } from './nestBy.js'

export function filterBy (data, getCondition, by) {
  const nestedData = nest(data, '$nested', by)
  const nestedDataLength = getDataLength(nestedData)

  const conditionPerGroup = {}

  for (let i = 0; i < nestedDataLength; i++) {
    const id = getId(nestedData, i, by)
    conditionPerGroup[id] = getCondition(nestedDataLength.$nested[i])
  }

  const length = getDataLength(data)
  const row = {}
  const newData = initNewData(data)

  for (let i = 0; i < length; i++) {
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
