export default class Structure {
  constructor ({ groupedColumnNames, output }) {
    this._groupedColumnNames = groupedColumnNames
    this._output = output

    this._groups = {}
  }

  addRow (row) {
    const groupedValues = this._getGroupedValues(row)
    const groupId = this._getGroupId(groupedValues)

    this._groups[groupId] = this._groups[groupId] || this._createGroup(row, groupedValues)

    this._updateGroup(groupId, row)
    this._groups[groupId].length++
  }

  _getGroupedValues (row) {
    const groupedValues = []

    if (this._groupedColumnNames === undefined) return groupedValues

    for (const columnName of this._groupedColumnNames) {
      groupedValues.push(row[columnName])
    }

    return groupedValues
  }

  _getGroupId (groupedValues) {
    return JSON.stringify(groupedValues)
  }

  _createGroupedValueObject (groupedValues) {
    const groupedValueObject = {}

    for (let i = 0; i < groupedValues.length; i++) {
      groupedValueObject[this._groupedColumnNames[i]] = groupedValues[i]
    }

    return groupedValueObject
  }
}
