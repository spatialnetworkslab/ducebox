import getResultingColumns from './getResultingColumns.js'

import NestedStructure from '../structures/NestedStructure.js'
import SummaryStructure from '../structures/SummaryStructure.js'

export default function processTransformationsCycle (data, input, output, transformations) {
  const dataLength = input.getDataLength(data)

  const groupedColumnNames = getGroupedColumnNames(transformations)

  const summaryInstructions = getInstructions(transformations, 'summarise', 'summariseObject')
  const nestInstructions = getInstructions(transformations, 'nest', 'nestedColumnName')

  const dataWillBeSummarised = summaryInstructions !== undefined
  const dataWillBeNested = nestInstructions !== undefined

  if (dataWillBeNested && !groupedColumnNames) {
    throw new Error('Can only use \'nest\' in combination with \'groupBy\'')
  }

  const resultingColumns = getResultingColumns(data, transformations, input)

  const resultingData = !dataWillBeSummarised && !dataWillBeNested
    ? output.initData(resultingColumns)
    : undefined

  const summaryStructure = dataWillBeSummarised
    ? new SummaryStructure({ summaryInstructions, groupedColumnNames, output })
    : undefined

  const nestedStructure = dataWillBeNested
    ? new NestedStructure({ groupedColumnNames, output })
    : undefined

  for (let i = 0; i < dataLength; i++) {
    const row = input.getRow(data, i)

    let skipRow = false

    for (let j = 0; j < transformations.length; j++) {
      const transformation = transformations[j]

      if (transformation.type === 'filter') {
        if (!transformation.condition(row)) {
          skipRow = true
          break
        }
      } else if (transformation.type === 'mutate') {
        const { newColumnName, calculationFunc } = transformation
        row[newColumnName] = calculationFunc(row)
      } else if (transformation.type === 'select') {
        for (const columnName in row) {
          if (!transformation.columnNames.has(columnName)) {
            delete row[columnName]
          }
        }
      }
    }

    if (!skipRow) {
      if (!dataWillBeSummarised && !dataWillBeNested) {
        output.addRow(resultingData, row)
      }

      if (dataWillBeSummarised) {
        summaryStructure.addRow(row)
      }

      if (dataWillBeNested) {
        nestedStructure.addRow(row)
      }
    }
  }

  if (!dataWillBeSummarised && !dataWillBeNested) {
    return resultingData
  }

  if (dataWillBeSummarised) {
    summaryStructure.applyAfterReduce(dataLength)
    return summaryStructure.convertToOutputData()
  }

  if (dataWillBeNested) {
    return nestedStructure.convertToOutputData(nestInstructions)
  }
}

function getGroupedColumnNames (transformations) {
  for (let i = 0; i < transformations.length - 1; i++) {
    const transformation = transformations[i]

    if (transformation.type === 'groupBy') return transformation.columnNames
  }
}

function getInstructions (transformations, type, property) {
  const lastTransformation = transformations[transformations.length - 1]

  if (lastTransformation.type === type) return lastTransformation[property]
}
