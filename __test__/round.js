export function roundArray (array, decimals = 0) {
  return array.map(v => round(v, decimals))
}

function round (number, decimals) {
  return Math.round(number * 10 ** decimals) / 10 ** decimals
}
