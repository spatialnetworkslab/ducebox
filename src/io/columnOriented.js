import { identity } from 'ramda'

export function wrap (data) {
  const length = getLength(data)

  return {
    reduce: function (step, acc) {
      let idx = 0

      while (idx < length) {
        const row = {}

        for (const columnName in data) {
          row[columnName] = data[columnName][idx]
        }

        acc = step(acc, row)

        if (acc && acc['@@transducer/reduced']) {
          acc = acc['@@transducer/value']
          break
        }

        idx += 1
      }

      return acc
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
