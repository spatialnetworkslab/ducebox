import { mode } from '../../src/index.js'

describe('mode: standalone', () => {
  it('works with only one element', () => {
    expect(mode([3])).toBe(3)
  })

  it('gives correct value when only one answer', () => {
    expect(mode([1, 1, 2, 2, 2, 3, 3, 4, 5, 5])).toBe(2)
  })

  it('gives lowest answer when multiple answers', () => {
    expect(mode([3, 3, 3, 2, 2, 1, 1, 1, 4, 4])).toBe(1)
  })
})

// describe('mode: transformer', () => {

// })
