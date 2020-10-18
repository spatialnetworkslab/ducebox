import { map } from 'ramda'

export default function mutate (mutateInstructions, df) {
  const mutateFn = getMutateFn(mutateInstructions)
  return df
    ? map(mutateFn, df)
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
