import { ascendingStr } from '../../src/index.js'

const a = { c1: 'a' }
const b = { c1: 'b' }

describe('ascendingStr', () => {
  it('works with String as arg', () => {
    const ascendingFn = ascendingStr('c1')

    expect(ascendingFn(a, b)).toBe(-1)
    expect(ascendingFn(b, a)).toBe(1)
    expect(ascendingFn(a, a)).toBe(0)
  })

  it('works with getter Function as arg', () => {
    const ascendingFn = ascendingStr(row => row.c1)

    expect(ascendingFn(a, b)).toBe(-1)
    expect(ascendingFn(b, a)).toBe(1)
    expect(ascendingFn(a, a)).toBe(0)
  })
})
