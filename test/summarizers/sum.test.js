import { sum } from '../../src/index.js'

describe('sum: standalone', () => {
  it('works', () => {
    expect(sum([1, 2, 3])).toBe(6)
  })
})

// describe('sum: transformer', () => {

// })
