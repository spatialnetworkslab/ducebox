import { ascending } from '../../src/index.js'

const a = { c1: 1 }
const b = { c1: 2 }

describe('ascending', () => {
  it('works with String as arg', () => {
    const ascendingFn = ascending('c1')

    expect(ascendingFn(a, b)).toBe(-1)
    expect(ascendingFn(b, a)).toBe(1)
    expect(ascendingFn(a, a)).toBe(0)
  })

  it('works with getter Function as arg', () => {
    const ascendingFn = ascending(row => row.c1)

    expect(ascendingFn(a, b)).toBe(-1)
    expect(ascendingFn(b, a)).toBe(1)
    expect(ascendingFn(a, a)).toBe(0)
  })
})
