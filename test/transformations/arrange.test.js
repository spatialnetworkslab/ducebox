import {
  arrange,
  ascending,
  descending,
  compose,
  mutate,
  filter,
  into
} from '../../src/index.js'

const input = [
  { a: 1, b: 1 },
  { a: 3, b: 3 },
  { a: 2, b: 2 },
  { a: 2, b: 1 },
  { a: 3, b: 4 },
  { a: 1, b: 7 }
]

describe('arrange: standalone', () => {
  it('works with one compare fn', () => {
    const output = arrange(ascending('a'), input)

    const expectedOutput = [
      { a: 1, b: 1 },
      { a: 1, b: 7 },
      { a: 2, b: 2 },
      { a: 2, b: 1 },
      { a: 3, b: 3 },
      { a: 3, b: 4 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works with two compare fns', () => {
    const output = arrange(
      [ascending('a'), descending('b')],
      input
    )

    const expectedOutput = [
      { a: 1, b: 7 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 },
      { a: 3, b: 4 },
      { a: 3, b: 3 }
    ]

    expect(output).toEqual(expectedOutput)
  })
})

describe('arrange: transformer', () => {
  it('mutate + arrange + filter', () => {
    const xf = compose(
      mutate({ c: ({ b }) => b + 1 }),
      arrange([ascending('a'), descending('c')]),
      filter(row => row.c !== 8)
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { a: 1, b: 1, c: 2 },
      { a: 2, b: 2, c: 3 },
      { a: 2, b: 1, c: 2 },
      { a: 3, b: 4, c: 5 },
      { a: 3, b: 3, c: 4 }
    ]

    expect(output).toEqual(expectedOutput)
  })
})
