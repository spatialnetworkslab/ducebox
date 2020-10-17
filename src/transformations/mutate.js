import { map } from 'ramda'

export default function mutate (mutateInstructions, functor) {
  const mutateFn = getMutateFn(mutateInstructions)
  return functor
    ? map(mutateFn, functor)
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
