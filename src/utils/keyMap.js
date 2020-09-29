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
    getId,

    get (id) {
      return map[id]
    },

    set (id, value) {
      map[id] = value
    },

    has (id) {
      return id in map
    }
  }
}
