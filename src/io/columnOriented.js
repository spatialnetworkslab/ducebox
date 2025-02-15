import { identity } from 'ramda'

export function wrap (data) {
  const length = _getLength(data)

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

function _getLength (data) {
  return data[Object.keys(data)[0]].length
}

function ColumnOrientedAccumulator () {
  this.init = true
}

ColumnOrientedAccumulator.prototype['@@transducer/init'] = () => ({})
ColumnOrientedAccumulator.prototype['@@transducer/result'] = identity
ColumnOrientedAccumulator.prototype['@@transducer/step'] = function (acc, row) {
  if (this.init) {
    this.init = false
    return this._initStep(acc, row)
  }

  return this._step(acc, row)
}
ColumnOrientedAccumulator.prototype._initStep = _initStep
ColumnOrientedAccumulator.prototype._step = _step

function _initStep (acc, row) {
  for (const columnName in row) {
    acc[columnName] = [row[columnName]]
  }

  return acc
}

function _step (acc, row) {
  for (const columnName in row) {
    acc[columnName].push(row[columnName])
  }

  return acc
}
