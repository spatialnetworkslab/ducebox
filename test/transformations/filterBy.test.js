import { filterBy, mean, median } from '../../src/index.js'

const input = [
  { c1: 'a', c2: 1, c3: 10 },
  { c1: 'a', c2: 2, c3: 20 },
  { c1: 'b', c2: 3, c3: 30 },
  { c1: 'b', c2: 4, c3: 40 }
]

describe('filterBy: standalone', () => {
  it('works with reducable summarizers', () => {
    const summariseFn = ({ c3 }) => ({ meanc3: mean(c3) })
    const predicate = (row, { meanc3 }) => row.c3 > meanc3

    const output = filterBy(summariseFn, predicate, ['c1'], input)

    const expectedOutput = [
      { c1: 'a', c2: 2, c3: 20 },
      { c1: 'b', c2: 4, c3: 40 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works with irreducable summarizers', () => {
    const summariseFn = ({ c3 }) => ({ medianc3: median(c3) })
    const predicate = (row, { mediannc3 }) => row.c3 > mediannc3

    const output = filterBy(summariseFn, predicate, ['c1'], input)

    const expectedOutput = [
      { c1: 'a', c2: 2, c3: 20 },
      { c1: 'b', c2: 4, c3: 40 }
    ]

    expect(output).toEqual(expectedOutput)
  })
})
