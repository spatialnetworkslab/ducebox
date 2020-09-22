export function transduce (source, rowTransformation, sink) {
  source.forEach((row, i) => {
    const transformedRow = rowTransformation(row, i)
    if (transformedRow) sink(transformedRow)
  })
}
