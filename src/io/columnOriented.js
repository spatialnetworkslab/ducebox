import { identity } from 'ramda'

export function iterable (data) {
  return {
    * [Symbol.iterator] () {
      const length = getLength(data)

      for (let i = 0; i < length; i++) {
        const row = {}

        for (const columnName in data) {
          row[columnName] = data[columnName][i]
        }

        yield row
      }
    }
  }
}

export function accumulator () {
  return new ColumnOrientedAccumulator()
}

function getLength (data) {
  return data[Object.keys(data)[0]].length
}

function ColumnOrientedAccumulator () {
  this['@@transducer/step'] = this._initStep
}

ColumnOrientedAccumulator.prototype['@@transducer/init'] = () => ({})
ColumnOrientedAccumulator.prototype['@@transducer/result'] = identity

ColumnOrientedAccumulator.prototype._initStep = function (acc, row) {
  for (const columnName in row) {
    acc[columnName] = [row[columnName]]
  }

  this['@@transducer/step'] = this._step

  return acc
}

ColumnOrientedAccumulator.prototype._step = function (acc, row) {
  for (const columnName in row) {
    acc[columnName].push(row[columnName])
  }

  return acc
}
