import validateTransformations from './helpers/validateTransformations.js'
import processTransformationsCycle from './helpers/processTransformationsCycle.js'
import processArrangeCycle from './helpers/processArrangeCycle.js'

export default function pipe (options) {
  validateTransformations(options.transformations)
  const cycles = getCycles(options.transformations)

  return function (data) {
    let newData = data
    let firstCycle = true

    for (const cycle of cycles) {
      const input = firstCycle ? options.input : options.output
      const output = options.output

      if (cycle.type === 'transformations') {
        newData = processTransformationsCycle(newData, input, output, cycle.transformations)
      }

      if (cycle.type === 'arrange') {
        newData = processArrangeCycle(newData, input, output, cycle.arrangeInstructions)
      }

      firstCycle = false
    }

    return newData
  }
}

function getCycles (transformations) {
  const cycles = []
  let currentCycle = newCycle()

  for (const transformation of transformations) {
    if (transformation.type === 'arrange') {
      if (currentCycle.transformations.length > 0) {
        cycles.push(currentCycle)
      }

      cycles.push({ type: 'arrange', arrangeInstructions: transformation.arrangeInstructions })
      currentCycle = newCycle()
    } else if (['summarise', 'nest'].includes(transformation.type)) {
      currentCycle.transformations.push(transformation)
      cycles.push(currentCycle)
      currentCycle = newCycle()
    } else {
      currentCycle.transformations.push(transformation)
    }
  }

  if (currentCycle.transformations.length > 0) {
    cycles.push(currentCycle)
  }

  return cycles
}

function newCycle () {
  return {
    type: 'transformations',
    transformations: []
  }
}
