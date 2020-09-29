class KeyMap {
  constructor (keyColumns) {
    this._map = {}
    this._keyColumns = keyColumns
  }

  id (row) {
    let id = '$'

    for (let i = 0; i < this._keyColumns.length; i++) {
      id += row[this._keyColumns[i]]
      id += '$'
    }

    return id
  }

  get (id) {
    return this._map[id]
  }

  set (id, value) {
    this._map[id] = value
  }

  has (id) {
    return id in this._map
  }
}

export function keyMap (keyColumns) {
  return new KeyMap(keyColumns)
}
