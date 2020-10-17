import { curryTransformation } from './_curry.js'

let rename = function (data, renameInstructions) {
  const newData = Object.assign({}, data)

  for (const newColumnName in renameInstructions) {
    const oldColumnName = renameInstructions[newColumnName]
    newData[newColumnName] = newData[oldColumnName]
    delete newData[oldColumnName]
  }

  return newData
}

rename = curryTransformation(rename)

export { rename }
