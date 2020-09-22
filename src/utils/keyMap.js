export function keyMap (keyColumns) {
  const map = {}

  function getId (row) {
    let id = '$'

    for (let i = 0; i < keyColumns.length; i++) {
      id += row[keyColumns[i]]
      id += '$'
    }

    return id
  }

  return {
    get (row) {
      return map[getId(row)]
    },

    set (row, value) {
      map[getId(row)] = value
    }
  }
}
