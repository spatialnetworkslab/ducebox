import { compose, mutate, filter, unnest, into } from '../../src/index.js'

const input = [
  { c1: 'a', c2: 'a', nested: [{ c3: 1 }, { c3: 3 }] },
  { c1: 'a', c2: 'b', nested: [{ c3: 2 }, { c3: 4 }] },
  { c1: 'b', c2: 'a', nested: [{ c3: 5 }, { c3: 7 }] },
  { c1: 'b', c2: 'b', nested: [{ c3: 6 }, { c3: 8 }] }
]

describe('unnest: standalone', () => {
  it('works', () => {
    const expectedOutput = [
      { c1: 'a', c2: 'a', c3: 1 },
      { c1: 'a', c2: 'a', c3: 3 },
      { c1: 'a', c2: 'b', c3: 2 },
      { c1: 'a', c2: 'b', c3: 4 },
      { c1: 'b', c2: 'a', c3: 5 },
      { c1: 'b', c2: 'a', c3: 7 },
      { c1: 'b', c2: 'b', c3: 6 },
      { c1: 'b', c2: 'b', c3: 8 }
    ]

    expect(unnest('nested', x => x, input)).toEqual(expectedOutput)
  })
})

describe('unnest: transformer', () => {
  it('mutate + filter + unnest', () => {
    const xf = compose(
      mutate({ c1: row => row.c1 + 'x' }),
      filter(row => row.c1 !== 'bx'),
      unnest('nested', x => x)
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { c1: 'ax', c2: 'a', c3: 1 },
      { c1: 'ax', c2: 'a', c3: 3 },
      { c1: 'ax', c2: 'b', c3: 2 },
      { c1: 'ax', c2: 'b', c3: 4 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('unnest + mutate + filter', () => {
    const xf = compose(
      unnest('nested', x => x),
      mutate({ c1: row => row.c1 + 'x' }),
      filter(row => row.c1 !== 'bx')
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { c1: 'ax', c2: 'a', c3: 1 },
      { c1: 'ax', c2: 'a', c3: 3 },
      { c1: 'ax', c2: 'b', c3: 2 },
      { c1: 'ax', c2: 'b', c3: 4 }
    ]

    expect(output).toEqual(expectedOutput)
  })
})
