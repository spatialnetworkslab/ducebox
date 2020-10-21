import { median } from '../../src/index.js'

describe('median: standalone', () => {
  it('works for odd array length', () => {
    expect(median([3, 20, 7, 8, 1, 1, 21])).toBe(7)
  })

  it('works for even array length', () => {
    expect(median([3, 20, 7, 8, 1, 22, 1, 21])).toBe(7.5)
  })
})
