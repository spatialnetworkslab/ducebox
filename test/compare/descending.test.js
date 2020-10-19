import { descending } from '../../src/index.js'

const a = { c1: 1 }
const b = { c1: 2 }

describe('descending', () => {
  it('works with String as arg', () => {
    const descendingFn = descending('c1')

    expect(descendingFn(a, b)).toBe(1)
    expect(descendingFn(b, a)).toBe(-1)
    expect(descendingFn(a, a)).toBe(0)
  })

  it('works with getter Function as arg', () => {
    const descendingFn = descending(row => row.c1)

    expect(descendingFn(a, b)).toBe(1)
    expect(descendingFn(b, a)).toBe(-1)
    expect(descendingFn(a, a)).toBe(0)
  })
})
