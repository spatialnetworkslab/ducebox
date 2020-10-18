import { map } from 'ramda'

export default function mutate (mutateInstructions, list) {
  const mutateFn = getMutateFn(mutateInstructions)
  return list
    ? map(mutateFn, list)
    : map(mutateFn)
}

function getMutateFn (mutateInstructions) {
  return row => {
    const newRow = Object.assign({}, row)

    for (const newColumnName in mutateInstructions) {
      newRow[newColumnName] = mutateInstructions[newColumnName](newRow)
    }

    return newRow
  }
}
