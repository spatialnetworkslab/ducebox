import Structure from './Structure.js'

export default class NestedStructure extends Structure {
  convertToOutputData (nestedColumnName) {
    const newData = this._output.initData([...this._groupedColumnNames, nestedColumnName])

    for (const groupId in this._groups) {
      const { groupedValueObject, nestedData } = this._groups[groupId]
      const row = { ...groupedValueObject, [nestedColumnName]: nestedData }

      this._output.addRow(newData, row)
    }

    return newData
  }

  _createGroup (row, groupedValues) {
    const nestedData = this._output.initData(Object.keys(row))
    const groupedValueObject = this._createGroupedValueObject(groupedValues)

    return {
      nestedData,
      groupedValueObject,
      length: 0
    }
  }

  _updateGroup (groupId, row) {
    this._output.addRow(this._groups[groupId].nestedData, row)
  }
}
