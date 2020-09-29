import { _iterFnsMixin } from './_iterFns.js'

class RowOrientedDataInterface {
  constructor (data = []) {
    this._data = data
  }

  // Getters
  getRow (index) {
    return this._data[index]
  }

  getNrow () {
    return this._data.length
  }

  getColumn (columnName) {
    const column = []

    for (let i = 0; i < this._data.length; i++) {
      column.push(this._data[i][columnName])
    }

    return column
  }

  getValue (columnName, index) {
    return this._data[index][columnName]
  }

  // Setters
  updateRow (row, index) {
    this._data[index] = row
  }

  updateValue (value, columnName, index) {
    this._data[index][columnName] = value
  }

  addRow (row) {
    this._data.push(row)
  }

  addColumn (column, columnName) {
    for (let i = 0; i < this._data.length; i++) {
      this._data[i][columnName] = column[i]
    }
  }
}

_iterFnsMixin(RowOrientedDataInterface)

export function create (data) {
  return new RowOrientedDataInterface(data)
}
