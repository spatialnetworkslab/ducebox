const init = '@@transducer/init'
const result = '@@transducer/result'
const step = '@@transducer/step'

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
  return new Accumulator()
}

function getLength (data) {
  return data[Object.keys(data)[0]].length
}

class Accumulator {
  constructor () {
    this[step] = this._initStep
  }

  _initStep (acc, row) {
    for (const columnName in row) {
      acc[columnName] = [row[columnName]]
    }

    this[step] = this._step

    return acc
  }

  _step (acc, row) {
    for (const columnName in row) {
      acc[columnName].push(row[columnName])
    }

    return acc
  }

  [init] () {
    return {}
  }

  [result] (acc) {
    return acc
  }
}
