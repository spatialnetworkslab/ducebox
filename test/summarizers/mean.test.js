import { mean } from '../../src/index.js'

describe('mean: standalone', () => {
  test('works', () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3)
  })
})

// describe('mean: transformer', () => {

// })
