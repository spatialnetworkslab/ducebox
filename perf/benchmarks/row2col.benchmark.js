const { benchmark } = require('@dynatrace/zakzak')
const { compose, filter, mutate, summariseBy, into, mean, sum, columnOriented } = require('../../dist/ducebox.cjs.js')
const { from, op } = require('arquero')
const { generateRow } = require('./__data__/generateRow.js')

const input = generateRow(100000)

benchmark('ducebox', () => {
  const xf = compose(
    filter(r => r.col1 !== 'c'),
    mutate({ col3: r => r.col2 / 10 }),
    summariseBy(c => ({
      meanCol2: mean(c.col2),
      sumCol3: sum(c.col3)
    }), ['col1'])
  )

  return into(columnOriented.accumulator(), xf, input)
})

benchmark('arquero', () => {
  return from(input)
    .filter(r => r.col1 !== 'c')
    .derive({ col3: r => r.col2 / 10 })
    .groupby('col1')
    .rollup({
      meanCol2: op.mean('col2'),
      sumCol3: op.sum('col3')
    })
    .reify()
})
