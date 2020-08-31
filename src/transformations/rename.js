export function rename (data, renameInstructions) {
  const newData = Object.assign({}, data)

  for (const newName in renameInstructions) {
    const oldName = renameInstructions[newName]
    newData[newName] = newData[oldName]
    delete newData[oldName]
  }

  return newData
}
