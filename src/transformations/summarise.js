import { curryTransformation } from './_curry.js'
import { FOLDABLE_REDUCER } from '../symbols.js'
import { getDataLength, getKeyValuePair, getId } from '../utils/index.js'

let summarise = function (data, summariseInstructions, by = []) {
  if (by.length === 0) {
    return summariseNotBy(data, summariseInstructions)
  }

  return allReducersFoldable(summariseInstructions)
    ? summariseByFoldable(data, summariseInstructions, by)
    : summariseByNonFoldable(data, summariseInstructions, by)
}

summarise = curryTransformation(summarise)

export { summarise }

function summariseNotBy (data, summariseInstructions) {
  const dataLength = getDataLength(data)
  const newData = initNewData(summariseInstructions)

  const reduceInstructions = getReduceInstructions(summariseInstructions)

  for (let i = 0; i < dataLength; i++) {
    for (const newColumnName in reduceInstructions) {
      const { oldColumnName, reducer } = reduceInstructions[newColumnName]
      newData[newColumnName].push(reducer(data[oldColumnName]))
    }
  }

  return newData
}

function allReducersFoldable (summariseInstructions) {
  for (const newColumnName in summariseInstructions) {
    const { value: reducer } = getKeyValuePair(summariseInstructions[newColumnName])

    if (!reducer[FOLDABLE_REDUCER]) return false
  }

  return true
}

function summariseByFoldable (data, summariseInstructions, by) {
  const dataLength = getDataLength(data)
  const newData = initNewData(summariseInstructions, by)
  const groupLengths = []

  let currentRowIndex = -1
  const idToRowIndex = {}

  const foldInstructions = getFoldInstructions(summariseInstructions)

  for (let i = 0; i < dataLength; i++) {
    const id = getId(data, i, by)

    if (!(id in idToRowIndex)) {
      currentRowIndex++
      idToRowIndex[id] = currentRowIndex

      for (let j = 0; j < by.length; j++) {
        const columnName = by[j]
        newData[columnName].push(data[columnName][i])
      }

      for (const newColumnName in foldInstructions) {
        newData[newColumnName].push(foldInstructions[newColumnName].startValue)
      }

      groupLengths.push(0)
    }

    const rowIndex = idToRowIndex[id]

    for (const newColumnName in foldInstructions) {
      newData[newColumnName][rowIndex] = foldInstructions.fold(
        data[foldInstructions.oldColumnName][i],
        newData[newColumnName][rowIndex]
      )
    }

    groupLengths[rowIndex]++
  }

  const newDataLength = getDataLength(newData)

  for (const newColumnName in foldInstructions) {
    for (let i = 0; i < newDataLength; i++) {
      newData[newColumnName][i] = foldInstructions[newColumnName].finally(
        newData[newColumnName][i],
        groupLengths[i]
      )
    }
  }

  return newData
}

function summariseByNonFoldable (data, summariseInstructions, by) {
  const dataLength = getDataLength(data)
  const newData = initNewData(summariseInstructions, by)

  let currentRowIndex = -1
  const idToRowIndex = {}

  const reduceInstructions = getReduceInstructions(summariseInstructions)

  for (let i = 0; i < dataLength; i++) {
    const id = getId(data, i, by)

    if (!(id in idToRowIndex)) {
      currentRowIndex++
      idToRowIndex[id] = currentRowIndex

      for (let j = 0; j < by.length; j++) {
        const columnName = by[j]
        newData[columnName].push(data[columnName][i])
      }

      for (const newColumnName in reduceInstructions) {
        newData[newColumnName].push([])
      }
    }

    const rowIndex = idToRowIndex[id]

    for (const newColumnName in reduceInstructions) {
      const { oldColumnName } = reduceInstructions[newColumnName]
      newData[newColumnName][rowIndex].push(data[oldColumnName][i])
    }
  }

  const newDataLength = getDataLength(newData)

  for (const newColumnName in reduceInstructions) {
    const { reducer } = reduceInstructions[newColumnName]

    for (let i = 0; i < newDataLength; i++) {
      newData[newColumnName][i] = reducer(newData[newColumnName][i])
    }
  }

  return newData
}

function initNewData (summariseInstructions, by = []) {
  const newData = {}

  for (const columnName in summariseInstructions) {
    newData[columnName] = []
  }

  for (const columnName of by) {
    newData[columnName] = []
  }

  return newData
}

function getFoldInstructions (summariseInstructions) {
  const foldInstructions = {}

  for (const newColumnName in summariseInstructions) {
    const {
      key: oldColumnName,
      value: reducer
    } = getKeyValuePair(summariseInstructions[newColumnName])

    foldInstructions[newColumnName] = {
      oldColumnName,
      ...reducer[FOLDABLE_REDUCER]
    }
  }

  return foldInstructions
}

function getReduceInstructions (summariseInstructions) {
  const reduceInstructions = {}

  for (const newColumnName in summariseInstructions) {
    const {
      key: oldColumnName,
      value: reducer
    } = getKeyValuePair(summariseInstructions[newColumnName])

    reduceInstructions[newColumnName] = {
      oldColumnName,
      reducer
    }
  }

  return reduceInstructions
}
