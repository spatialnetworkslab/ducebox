import { compose, filter, mutate, into } from '../../src/index.js'

describe('mutate: standalone', () => {
  it('works', () => {
    const input = [{ a: 10, b: 5 }, { a: 15, b: 3 }]
    const expectedOutput = [{ a: 10, b: 5, c: 2 }, { a: 15, b: 3, c: 5 }]

    expect(mutate({ c: ({ a, b }) => a / b }, input)).toEqual(expectedOutput)
  })
})

describe('mutate: transformer', () => {
  it('works', () => {
    const input = [
      { c1: 'a', c2: 'a', c3: 1 },
      { c1: 'a', c2: 'b', c3: 2 },
      { c1: 'a', c2: 'a', c3: 3 },
      { c1: 'a', c2: 'b', c3: 4 },
      { c1: 'b', c2: 'a', c3: 5 },
      { c1: 'b', c2: 'b', c3: 6 },
      { c1: 'b', c2: 'a', c3: 7 },
      { c1: 'b', c2: 'b', c3: 8 },
      { c1: 'c', c2: 'a', c3: 9 },
      { c1: 'c', c2: 'b', c3: 10 },
      { c1: 'c', c2: 'a', c3: 11 },
      { c1: 'c', c2: 'b', c3: 12 }
    ]

    const xf = compose(
      filter(row => row.c1 !== 'c'),
      mutate({ c3: row => row.c3 * 10 }),
      filter(row => row.c3 > 10)
    )

    const expectedOutput = [
      { c1: 'a', c2: 'b', c3: 20 },
      { c1: 'a', c2: 'a', c3: 30 },
      { c1: 'a', c2: 'b', c3: 40 },
      { c1: 'b', c2: 'a', c3: 50 },
      { c1: 'b', c2: 'b', c3: 60 },
      { c1: 'b', c2: 'a', c3: 70 },
      { c1: 'b', c2: 'b', c3: 80 }
    ]

    expect(into([], xf, input)).toEqual(expectedOutput)
  })
})
