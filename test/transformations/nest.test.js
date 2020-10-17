import { compose, nest, mutate, filter, into } from '../../src/index.js'

const input = [
  { c1: 'a', c2: 'a', c3: 10 },
  { c1: 'a', c2: 'b', c3: 20 },
  { c1: 'a', c2: 'a', c3: 30 },
  { c1: 'a', c2: 'b', c3: 40 },
  { c1: 'b', c2: 'a', c3: 50 },
  { c1: 'b', c2: 'b', c3: 60 },
  { c1: 'b', c2: 'a', c3: 70 },
  { c1: 'b', c2: 'b', c3: 80 },
  { c1: 'c', c2: 'a', c3: 90 },
  { c1: 'c', c2: 'b', c3: 100 },
  { c1: 'c', c2: 'a', c3: 110 },
  { c1: 'c', c2: 'b', c3: 120 }
]

describe('nest: standalone', () => {
  it('works', () => {
    const expectedOutput = [
      { c1: 'a', c2: 'a', nested: [{ c3: 10 }, { c3: 30 }] },
      { c1: 'a', c2: 'b', nested: [{ c3: 20 }, { c3: 40 }] },
      { c1: 'b', c2: 'a', nested: [{ c3: 50 }, { c3: 70 }] },
      { c1: 'b', c2: 'b', nested: [{ c3: 60 }, { c3: 80 }] },
      { c1: 'c', c2: 'a', nested: [{ c3: 90 }, { c3: 110 }] },
      { c1: 'c', c2: 'b', nested: [{ c3: 100 }, { c3: 120 }] }
    ]

    expect(nest('nested', [], ['c1', 'c2'], input)).toEqual(expectedOutput)
  })
})

describe('nest: transformer', () => {
  it('mutate + filter + nest', () => {
    const xf = compose(
      mutate({ c3: row => row.c3 / 10 }),
      filter(row => row.c1 !== 'c'),
      nest('nested', [], ['c1', 'c2'])
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { c1: 'a', c2: 'a', nested: [{ c3: 1 }, { c3: 3 }] },
      { c1: 'a', c2: 'b', nested: [{ c3: 2 }, { c3: 4 }] },
      { c1: 'b', c2: 'a', nested: [{ c3: 5 }, { c3: 7 }] },
      { c1: 'b', c2: 'b', nested: [{ c3: 6 }, { c3: 8 }] }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('mutate + filter + nest + filter', () => {
    const xf = compose(
      mutate({ c3: row => row.c3 / 10 }),
      filter(row => row.c1 !== 'c'),
      nest('nested', [], ['c1', 'c2']),
      filter(row => row.c1 === 'a')
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { c1: 'a', c2: 'a', nested: [{ c3: 1 }, { c3: 3 }] },
      { c1: 'a', c2: 'b', nested: [{ c3: 2 }, { c3: 4 }] }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('mutate + filter + nest + mutate', () => {
    const xf = compose(
      mutate({ c3: row => row.c3 / 10 }),
      filter(row => row.c1 !== 'c'),
      nest('nested', [], ['c1', 'c2']),
      mutate({ c2: row => row.c2 + 'x' })
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { c1: 'a', c2: 'ax', nested: [{ c3: 1 }, { c3: 3 }] },
      { c1: 'a', c2: 'bx', nested: [{ c3: 2 }, { c3: 4 }] },
      { c1: 'b', c2: 'ax', nested: [{ c3: 5 }, { c3: 7 }] },
      { c1: 'b', c2: 'bx', nested: [{ c3: 6 }, { c3: 8 }] }
    ]

    expect(output).toEqual(expectedOutput)
  })
})
