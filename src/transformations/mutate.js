import { map } from 'ramda'

export function mutate (...args) {
  const { data, mutateInstructions } = parseArgs(args)
  const mapFn = constructMapFn(mutateInstructions)

  if (data) {
    return map(mapFn, data)
  }

  return map(mapFn)
}

function parseArgs (args) {
  const lastIndex = args.length - 1

  if (isMutateInstruction(args[lastIndex])) {
    return { mutateInstructions: args }
  }

  return {
    data: args[lastIndex],
    mutateInstructions: args.slice(1)
  }
}

function isMutateInstruction (arg) {
  const keys = Object.keys(arg)
  const key = keys[0]

  return (
    arg.constructor === Object &&
    keys.length === 1 &&
    arg[key].constructor === Function
  )
}

function constructMapFn (mutateInstructions) {
  const parsedMutateInstructions = mutateInstructions.map(pair => {
    const [columnName, mutateFn] = Object.entries(pair)[0]
    return { columnName, mutateFn }
  })

  return function (row) {
    for (let i = 0; i < parsedMutateInstructions.length; i++) {
      const { columnName, mutateFn } = parsedMutateInstructions[i]
      row[columnName] = mutateFn(row)
    }

    return row
  }
}
