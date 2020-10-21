import { max } from '../../src/index.js'

describe('max: standalone', () => {
  it('works', () => {
    expect(max([1, 5, 2, 3])).toBe(5)
  })
})

// describe('max: transformer', () => {

// })
