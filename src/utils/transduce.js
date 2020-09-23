export function transduce (source, rowTransformation, sink) {
  source.forEachRow((row, i) => {
    const transformedRow = rowTransformation(row, i)

    if (transformedRow) {
      sink.addRow(transformedRow, i)
    }
  })

  return sink.prepareOutput()
}
