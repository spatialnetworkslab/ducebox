import { summariseBy, mean, sum, median } from '../../src/index.js'

const input = [
  { c1: 'a', c2: 1, c3: 10 },
  { c1: 'a', c2: 2, c3: 20 },
  { c1: 'b', c2: 3, c3: 30 },
  { c1: 'b', c2: 4, c3: 40 }
]

describe('summariseBy: standalone', () => {
  it('works with reducable summarizers', () => {
    const summariseFn = row => ({
      mean_c2: mean(row.c2),
      sum_c3: sum(row.c3)
    })

    const output = summariseBy(summariseFn, ['c1'], input)

    const expectedOutput = [
      { c1: 'a', mean_c2: 1.5, sum_c3: 30 },
      { c1: 'b', mean_c2: 3.5, sum_c3: 70 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works with irreducable summarizers', () => {
    const summariseFn = row => ({
      mean_c2: median(row.c2),
      sum_c3: sum(row.c3)
    })

    const output = summariseBy(summariseFn, ['c1'], input)

    const expectedOutput = [
      { c1: 'a', mean_c2: 1.5, sum_c3: 30 },
      { c1: 'b', mean_c2: 3.5, sum_c3: 70 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  // it('works with arbitrary functions as summarizers', () => {

  // })
})

// describe('summariseBy: transformer', () => {

// })
