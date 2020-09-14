import { getDataLength, getKeyValuePair } from '../utils'

export function summarise (data, summariseInstructions) {
  const length = getDataLength(data)
  const newData = initNewData(summariseInstructions)

  for (let i = 0; i < length; i++) {
    for (const newColumnName in summariseInstructions) {
      const {
        key: oldColumnName,
        value: reducer
      } = getKeyValuePair(summariseInstructions[newColumnName])

      newData[newColumnName].push(reducer(data[oldColumnName]))
    }
  }

  return newData
}

export function initNewData (summariseInstructions) {
  const newData = {}

  for (const columnName in summariseInstructions) {
    newData[columnName] = []
  }

  return newData
}
