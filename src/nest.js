export function nest (nestedColumnName) {
  return {
    type: 'nest',
    nestedColumnName
  }
}
