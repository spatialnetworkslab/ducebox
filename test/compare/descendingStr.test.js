import { descendingStr } from '../../src/index.js'

const a = { c1: 'a' }
const b = { c1: 'b' }

describe('descending', () => {
  it('works with String as arg', () => {
    const descendingFn = descendingStr('c1')

    expect(descendingFn(a, b)).toBe(1)
    expect(descendingFn(b, a)).toBe(-1)
    expect(descendingFn(a, a)).toBe(0)
  })

  it('works with getter Function as arg', () => {
    const descendingFn = descendingStr(row => row.c1)

    expect(descendingFn(a, b)).toBe(1)
    expect(descendingFn(b, a)).toBe(-1)
    expect(descendingFn(a, a)).toBe(0)
  })
})
