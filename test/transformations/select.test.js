import { select, compose, mutate, filter, into } from '../../src/index.js'

const input = [
  { c1: 'a', c2: 1, c3: 10, c4: 'a' },
  { c1: 'a', c2: 2, c3: 20, c4: 'b' },
  { c1: 'a', c2: 3, c3: 30, c4: 'a' },
  { c1: 'a', c2: 4, c3: 40, c4: 'b' },
  { c1: 'b', c2: 5, c3: 50, c4: 'a' },
  { c1: 'b', c2: 6, c3: 60, c4: 'b' },
  { c1: 'b', c2: 7, c3: 70, c4: 'a' },
  { c1: 'b', c2: 8, c3: 80, c4: 'b' }
]

describe('select: standalone', () => {
  it('works', () => {
    const expectedOutput = [
      { c1: 'a', c3: 10 },
      { c1: 'a', c3: 20 },
      { c1: 'a', c3: 30 },
      { c1: 'a', c3: 40 },
      { c1: 'b', c3: 50 },
      { c1: 'b', c3: 60 },
      { c1: 'b', c3: 70 },
      { c1: 'b', c3: 80 }
    ]

    expect(select(['c1', 'c3'], input)).toEqual(expectedOutput)
  })
})

describe('select: transformer', () => {
  it('mutate + select + filter', () => {
    const mutateInstructions = {
      c5: row => row.c3 - row.c2
    }

    const xf = compose(
      mutate(mutateInstructions),
      select(['c1', 'c3', 'c4', 'c5']),
      filter(row => row.c5 < 54)
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { c1: 'a', c3: 10, c4: 'a', c5: 9 },
      { c1: 'a', c3: 20, c4: 'b', c5: 18 },
      { c1: 'a', c3: 30, c4: 'a', c5: 27 },
      { c1: 'a', c3: 40, c4: 'b', c5: 36 },
      { c1: 'b', c3: 50, c4: 'a', c5: 45 }
    ]

    expect(output).toEqual(expectedOutput)
  })
})
