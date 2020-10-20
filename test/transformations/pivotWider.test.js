import { pivotWider, compose, filter, mutate, into } from '../../src/index.js'

describe('pivotWider: standalone', () => {
  it('works (values complete)', () => {
    const input = [
      { idCol: 'a', names: 'x', values: 1 },
      { idCol: 'a', names: 'y', values: 2 },
      { idCol: 'a', names: 'z', values: 3 },
      { idCol: 'b', names: 'x', values: 10 },
      { idCol: 'b', names: 'y', values: 20 },
      { idCol: 'b', names: 'z', values: 30 },
      { idCol: 'c', names: 'x', values: 100 },
      { idCol: 'c', names: 'y', values: 200 },
      { idCol: 'c', names: 'z', values: 300 }
    ]

    const pivotInstructions = { namesFrom: 'names', valuesFrom: 'values' }

    const output = pivotWider(pivotInstructions, input)

    const expectedOutput = [
      { idCol: 'a', x: 1, y: 2, z: 3 },
      { idCol: 'b', x: 10, y: 20, z: 30 },
      { idCol: 'c', x: 100, y: 200, z: 300 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works (values missing)', () => {
    const input = [
      { idCol: 'a', names: 'x', values: 1 },
      { idCol: 'a', names: 'y', values: 2 },
      { idCol: 'b', names: 'x', values: 10 },
      { idCol: 'b', names: 'y', values: 20 },
      { idCol: 'b', names: 'z', values: 30 },
      { idCol: 'c', names: 'x', values: 100 },
      { idCol: 'c', names: 'z', values: 300 }
    ]

    const pivotInstructions = { namesFrom: 'names', valuesFrom: 'values' }

    const output = pivotWider(pivotInstructions, input)

    const expectedOutput = [
      { idCol: 'a', x: 1, y: 2, z: null },
      { idCol: 'b', x: 10, y: 20, z: 30 },
      { idCol: 'c', x: 100, y: null, z: 300 }
    ]

    expect(output).toEqual(expectedOutput)
  })

  it('works (values, missing custom fill value)', () => {
    const input = [
      { idCol: 'a', names: 'x', values: 1 },
      { idCol: 'a', names: 'y', values: 2 },
      { idCol: 'b', names: 'x', values: 10 },
      { idCol: 'b', names: 'y', values: 20 },
      { idCol: 'b', names: 'z', values: 30 },
      { idCol: 'c', names: 'x', values: 100 },
      { idCol: 'c', names: 'z', values: 300 }
    ]

    const pivotInstructions = {
      namesFrom: 'names',
      valuesFrom: 'values',
      valuesFill: NaN
    }

    const output = pivotWider(pivotInstructions, input)

    const expectedOutput = [
      { idCol: 'a', x: 1, y: 2, z: NaN },
      { idCol: 'b', x: 10, y: 20, z: 30 },
      { idCol: 'c', x: 100, y: NaN, z: 300 }
    ]

    expect(output).toEqual(expectedOutput)
  })
})

describe('pivotWider: transformer', () => {
  it('filter + pivotWider + mutate', () => {
    const input = [
      { idCol: 'a', names: 'x', values: 1 },
      { idCol: 'a', names: 'y', values: 2 },
      { idCol: 'a', names: 'z', values: 3 },
      { idCol: 'b', names: 'x', values: 10 },
      { idCol: 'b', names: 'y', values: 20 },
      { idCol: 'b', names: 'z', values: 30 },
      { idCol: 'c', names: 'x', values: 100 },
      { idCol: 'c', names: 'y', values: 200 },
      { idCol: 'c', names: 'z', values: 300 }
    ]

    const xf = compose(
      filter(row => row.names !== 'y'),
      pivotWider({ namesFrom: 'names', valuesFrom: 'values' }),
      mutate({ y: ({ x, z }) => x + z })
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { idCol: 'a', x: 1, y: 4, z: 3 },
      { idCol: 'b', x: 10, y: 40, z: 30 },
      { idCol: 'c', x: 100, y: 400, z: 300 }
    ]

    expect(output).toEqual(expectedOutput)
  })
})
