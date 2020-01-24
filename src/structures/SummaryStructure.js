import Structure from './Structure.js'

export default class SummaryStructure extends Structure {
  constructor ({ summaryInstructions, groupedColumnNames, output }) {
    super({ groupedColumnNames, output })

    this._summaryInstructions = summaryInstructions
  }

  applyAfterReduce (dataLength) {
    if (this._groupedColumnNames) {
      this._applyAfterReduceGrouped()
    }

    if (!this._groupedColumnNames) {
      this._applyAfterReduceUngrouped(dataLength)
    }
  }

  convertToOutputData () {
    const groupedColumnNames = this._groupedColumnNames || []
    const summaryColumnNames = Object.keys(this._summaryInstructions)
    const newData = this._output.initData(groupedColumnNames.concat(summaryColumnNames))

    for (const groupId in this._groups) {
      const { groupedValueObject, summaryData } = this._groups[groupId]
      const row = { ...groupedValueObject, ...summaryData }

      this._output.addRow(newData, row)
    }

    return newData
  }

  _createGroup (row, groupedValues) {
    const summaryData = {}

    for (const summaryColumnName in this._summaryInstructions) {
      summaryData[summaryColumnName] = this._summaryInstructions[summaryColumnName].initialValue
    }

    const groupedValueObject = this._createGroupedValueObject(groupedValues)

    return {
      summaryData,
      groupedValueObject,
      length: 0
    }
  }

  _updateGroup (groupId, row) {
    const group = this._groups[groupId]

    for (const summaryColumnName in this._summaryInstructions) {
      const reducer = this._summaryInstructions[summaryColumnName].reducer

      group.summaryData[summaryColumnName] = reducer(group.summaryData[summaryColumnName], row)
    }
  }

  _applyAfterReduceGrouped () {
    for (const groupId in this._groups) {
      const group = this._groups[groupId]
      const groupLength = group.length

      group.summaryData = this._applyAfterReduce(group.summaryData, groupLength)
    }
  }

  _applyAfterReduceUngrouped (dataLength) {
    const groupId = '_'
    const group = this._groups[groupId]

    group.summaryData = this._applyAfterReduce(group.summaryData, dataLength)
  }

  _applyAfterReduce (summaryData, groupLength) {
    for (const summaryColumnName in this._summaryInstructions) {
      const { afterReduce } = this._summaryInstructions[summaryColumnName]

      if (afterReduce) {
        summaryData[summaryColumnName] = afterReduce(
          summaryData[summaryColumnName],
          groupLength
        )
      }
    }

    return summaryData
  }
}
