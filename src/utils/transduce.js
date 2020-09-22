export function transduce (source, rowTransformation, sink) {
  return function (inputData, ...args) {
    const outputData = sink.init(
      source.getColumnNames(inputData),
      args
    )

    source.forEach(inputData, (row, i) => {
      const transformedRow = rowTransformation(row, i)
      if (transformedRow) sink.addRow(outputData, transformedRow)
    })

    return sink.prepareOutput(outputData)
  }
}
