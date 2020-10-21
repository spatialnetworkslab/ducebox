import { slice, compose, filter, mutate, into } from '../../src/index.js'

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

describe('slice: standalone', () => {
  it('works', () => {
    const expectedOutput = [
      { c1: 'a', c2: 1, c3: 10, c4: 'a' },
      { c1: 'a', c2: 3, c3: 30, c4: 'a' },
      { c1: 'b', c2: 5, c3: 50, c4: 'a' },
      { c1: 'b', c2: 7, c3: 70, c4: 'a' }
    ]

    expect(slice([0, 2, 4, 6], input)).toEqual(expectedOutput)
  })
})

describe('slice: transformer', () => {
  it('filter + slice + mutate', () => {
    const noAA = row => !(row.c1 === 'a' && row.c4 === 'a')

    const mutateInstructions = {
      c5: row => row.c3 - row.c2
    }

    const xf = compose(
      filter(noAA),
      slice([0, 3, 4]),
      mutate(mutateInstructions)
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { c1: 'a', c2: 2, c3: 20, c4: 'b', c5: 18 },
      { c1: 'b', c2: 6, c3: 60, c4: 'b', c5: 54 },
      { c1: 'b', c2: 7, c3: 70, c4: 'a', c5: 63 }
    ]

    expect(output).toEqual(expectedOutput)
  })
})
