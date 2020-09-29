import { _iterFnsMixin } from './_iterFns.js'

class RowOrientedDataInterface {
  constructor (data = []) {
    this._data = data
  }

  // Getters
  getRow (index) {
    return this.data[index]
  }

  getNrow () {
    return this.data.length
  }

  getColumn (columnName) {
    const column = []

    for (let i = 0; i < this.data.length; i++) {
      column.push(this.data[i][columnName])
    }

    return column
  }

  getValue (columnName, index) {
    return this.data[index][columnName]
  }

  // Setters
  updateRow (row, index) {
    this.data[index] = row
  }

  updateValue (value, columnName, index) {
    this.data[index][columnName] = value
  }

  addRow (row) {
    this.data.push(row)
  }

  addColumn (column, columnName) {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i][columnName] = column[i]
    }
  }
}

_iterFnsMixin(RowOrientedDataInterface)

export function create (data) {
  return new RowOrientedDataInterface(data)
}
