import {
  summariseBy,
  mean,
  sum,
  median,
  filter,
  mutate,
  compose,
  into
} from '../../src/index.js'

const input = [
  { c1: 'a', c2: 1, c3: 10 },
  { c1: 'a', c2: 2, c3: 20 },
  { c1: 'b', c2: 3, c3: 30 },
  { c1: 'b', c2: 4, c3: 40 }
]

const input2 = [
  { c1: 'a', c2: 1, c3: 10, c4: 'a' },
  { c1: 'a', c2: 2, c3: 20, c4: 'b' },
  { c1: 'a', c2: 3, c3: 30, c4: 'a' },
  { c1: 'a', c2: 4, c3: 40, c4: 'b' },
  { c1: 'b', c2: 5, c3: 50, c4: 'a' },
  { c1: 'b', c2: 6, c3: 60, c4: 'b' },
  { c1: 'b', c2: 7, c3: 70, c4: 'a' },
  { c1: 'b', c2: 8, c3: 80, c4: 'b' }
]

describe('summariseBy: standalone', () => {
  it('works with reducable summarizers', () => {
    const summariseFn = cols => ({
      mean_c2: mean(cols.c2),
      sum_c3: sum(cols.c3)
    })

    const output = summariseBy(summariseFn, ['c1'], input)

    const expectedOutput = [
      { c1: 'a', mean_c2: 1.5, sum_c3: 30 },
      { c1: 'b', mean_c2: 3.5, sum_c3: 70 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works with irreducable summarizers', () => {
    const summariseFn = cols => ({
      mean_c2: median(cols.c2),
      sum_c3: sum(cols.c3)
    })

    const output = summariseBy(summariseFn, ['c1'], input)

    const expectedOutput = [
      { c1: 'a', mean_c2: 1.5, sum_c3: 30 },
      { c1: 'b', mean_c2: 3.5, sum_c3: 70 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works with arbitrary functions as summarizers', () => {
    const arbitraryFn = array => array.reduce((a, b) => a + b)

    const summariseFn = cols => ({
      mean_c2: mean(cols.c2),
      sum_c3: arbitraryFn(cols.c3)
    })

    const output = summariseBy(summariseFn, ['c1'], input)

    const expectedOutput = [
      { c1: 'a', mean_c2: 1.5, sum_c3: 30 },
      { c1: 'b', mean_c2: 3.5, sum_c3: 70 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works with multiple by columns', () => {
    const summariseFn = cols => ({
      mean_c2: mean(cols.c2),
      sum_c3: sum(cols.c3)
    })

    const output = summariseBy(summariseFn, ['c1', 'c4'], input2)

    const expectedOutput = [
      { c1: 'a', c4: 'a', mean_c2: 2, sum_c3: 40 },
      { c1: 'a', c4: 'b', mean_c2: 3, sum_c3: 60 },
      { c1: 'b', c4: 'a', mean_c2: 6, sum_c3: 120 },
      { c1: 'b', c4: 'b', mean_c2: 7, sum_c3: 140 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works if by is empty array', () => {
    const summariseFn = cols => ({
      mean_c2: mean(cols.c2),
      sum_c3: sum(cols.c3)
    })

    const output = summariseBy(summariseFn, [], input2)

    const expectedOutput = [{ mean_c2: 4.5, sum_c3: 360 }]

    expect(output).toEqual(expectedOutput)
  })
})

describe('summariseBy: transformer', () => {
  it('filter -> summariseBy -> mutate', () => {
    const noBB = row => !(row.c1 === 'b' && row.c4 === 'b')

    const summariseFn = cols => ({
      mean_c2: mean(cols.c2),
      sum_c3: sum(cols.c3)
    })

    const mutateInstructions = {
      c5: row => row.mean_c2 + row.sum_c3
    }

    const xf = compose(
      filter(noBB),
      summariseBy(summariseFn, ['c1', 'c4']),
      mutate(mutateInstructions)
    )

    const output = into([], xf, input2)

    const expectedOutput = [
      { c1: 'a', c4: 'a', mean_c2: 2, sum_c3: 40, c5: 42 },
      { c1: 'a', c4: 'b', mean_c2: 3, sum_c3: 60, c5: 63 },
      { c1: 'b', c4: 'a', mean_c2: 6, sum_c3: 120, c5: 126 }
    ]

    expect(output).toEqual(expectedOutput)
  })
})
