import { count } from '../../src/index.js'

describe('count: standalone', () => {
  it('works', () => {
    expect(count([10, 20, 30])).toBe(3)
  })
})

// describe('count: transformer', () => {

// })
