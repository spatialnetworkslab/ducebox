const iterFns = {
  forEachRow (fn) {
    const nrow = this._getNrow()

    for (let i = 0; i < nrow; i++) {
      fn(this.getRow(i), i)
    }
  },

  forRowInRange (range, fn) {
    const [from, to] = range

    for (let i = from; i < to; i++) {
      fn(this.getRow(i), i)
    }
  },

  forEachIndex (indices, fn) {
    for (let i = 0; i < indices.length; i++) {
      const index = indices[i]
      fn(this.getRow(index), index)
    }
  },

  reduce (reduceFn, acc) {
    this.forEachRow(row => { acc = reduceFn(acc, row) })
    return acc
  },

  reduceRange (range, reduceFn, acc) {
    this.forRowInRange(range, row => { acc = reduceFn(acc, row) })
    return acc
  },

  reduceIndex (indices, reduceFn, acc) {
    this.forEachIndex(indices, row => { acc = reduceFn(acc, row) })
    return acc
  }
}

export function _iterFnsMixin (target) {
  Object.assign(target.prototype, iterFns)
}
