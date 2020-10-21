import { min } from '../../src/index.js'

describe('min: standalone', () => {
  it('works', () => {
    expect(min([0, 1, 4, -2, 3])).toBe(-2)
  })
})

// describe('min: transformer', () => {

// })
