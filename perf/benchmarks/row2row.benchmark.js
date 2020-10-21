const { benchmark, suite } = require('@dynatrace/zakzak')
// const { mutate } = require('../../dist/ducebox.cjs.js')

suite('row2row', () => {
  benchmark('ducebox', () => {
    return 1 + 1 === 2
  })
})

// benchmark('ramda', () => {

// })

// benchmark('arquero', () => {

// })
