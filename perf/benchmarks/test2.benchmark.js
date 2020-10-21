const { benchmark } = require('@dynatrace/zakzak')
const { mutate } = require('../../dist/ducebox.cjs.js')

const input = [{ x: 1, y: 2 }, { x: 3, y: 4 }]

benchmark('test2', () => {
  mutate({ z: ({ x, y }) => x + y }, input)
})
