import { _iterFnsMixin } from './_iterFns.js'

class ColumnOrientedDataInterface {
  constructor (data = {}) {
    this._data = data
    this._columnsInitialized = false
  }

  // Getters
  getRow (index) {
    const row = {}

    for (const columnName in this._data) {
      row[columnName] = this._data[columnName][index]
    }

    return row
  }

  getNrow () {
    return this._data[Object.keys(this._data)[0]].length
  }

  getColumn (columnName) {
    return this._data[columnName]
  }

  getValue (columnName, index) {
    return this._data[columnName][index]
  }

  // Setters
  updateRow (row, index) {
    for (const columnName in row) {
      this._data[columnName][index] = row[columnName]
    }
  }

  updateValue (value, columnName, index) {
    this._data[columnName][index] = value
  }

  addRow (row) {
    if (!this._columnsInitialized) {
      for (const columnName in row) {
        this._data[columnName] = []
      }

      this._columnsInitialized = true
    }

    for (const columnName in row) {
      this._data[columnName].push(row[columnName])
    }
  }

  addColumn (column, columnName) {
    this._data[columnName] = column
  }
}

_iterFnsMixin(ColumnOrientedDataInterface)

export function create (data) {
  return new ColumnOrientedDataInterface(data)
}
