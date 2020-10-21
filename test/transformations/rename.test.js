import { rename, compose, filter, mutate, into } from '../../src/index.js'

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

describe('rename: standalone', () => {
  it('works', () => {
    const renameInstructions = {
      d1: 'c1',
      d2: 'c2'
    }

    const output = rename(renameInstructions, input)

    const expectedOutput = [
      { d1: 'a', d2: 1, c3: 10, c4: 'a' },
      { d1: 'a', d2: 2, c3: 20, c4: 'b' },
      { d1: 'a', d2: 3, c3: 30, c4: 'a' },
      { d1: 'a', d2: 4, c3: 40, c4: 'b' },
      { d1: 'b', d2: 5, c3: 50, c4: 'a' },
      { d1: 'b', d2: 6, c3: 60, c4: 'b' },
      { d1: 'b', d2: 7, c3: 70, c4: 'a' },
      { d1: 'b', d2: 8, c3: 80, c4: 'b' }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works when renaming things that you just renamed', () => {
    const renameInstructions = {
      d1: 'c1',
      d2: 'c2',
      e1: 'd1'
    }

    const output = rename(renameInstructions, input)

    const expectedOutput = [
      { e1: 'a', d2: 1, c3: 10, c4: 'a' },
      { e1: 'a', d2: 2, c3: 20, c4: 'b' },
      { e1: 'a', d2: 3, c3: 30, c4: 'a' },
      { e1: 'a', d2: 4, c3: 40, c4: 'b' },
      { e1: 'b', d2: 5, c3: 50, c4: 'a' },
      { e1: 'b', d2: 6, c3: 60, c4: 'b' },
      { e1: 'b', d2: 7, c3: 70, c4: 'a' },
      { e1: 'b', d2: 8, c3: 80, c4: 'b' }
    ]

    expect(output).toEqual(expectedOutput)
  })
})

describe('rename: transformer', () => {
  it('filter + rename + mutate', () => {
    const renameInstructions = {
      d1: 'c1',
      d2: 'c2',
      e1: 'd1'
    }

    const xf = compose(
      filter(row => row.c3 > 30),
      rename(renameInstructions),
      mutate({ d5: ({ e1, d2 }) => e1 + d2.toString() })
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { e1: 'a', d2: 4, c3: 40, c4: 'b', d5: 'a4' },
      { e1: 'b', d2: 5, c3: 50, c4: 'a', d5: 'b5' },
      { e1: 'b', d2: 6, c3: 60, c4: 'b', d5: 'b6' },
      { e1: 'b', d2: 7, c3: 70, c4: 'a', d5: 'b7' },
      { e1: 'b', d2: 8, c3: 80, c4: 'b', d5: 'b8' }
    ]

    expect(output).toEqual(expectedOutput)
  })
})
