export default function _idFromCols (row, idCols, sep = '@') {
  let id = sep

  for (let i = 0; i < idCols.length; i++) {
    id += row[idCols[i]] + sep
  }

  return id
}
