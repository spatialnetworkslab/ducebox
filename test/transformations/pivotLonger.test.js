import { pivotLonger, compose, mutate, filter, into, columnOriented } from '../../src/index.js'

const input = [
  { col1: 1, col2: 10, col3: 'a', col4: 'aa', col5: 'aaa' },
  { col1: 2, col2: 20, col3: 'b', col4: 'bb', col5: 'bbb' },
  { col1: 3, col2: 30, col3: 'c', col4: 'cc', col5: 'ccc' }
]

const pivotInstructions = {
  columns: ['col3', 'col4', 'col5'],
  namesTo: 'name',
  valuesTo: 'value'
}

describe('pivotLonger: standalone', () => {
  it('works', () => {
    const output = pivotLonger(pivotInstructions, input)

    const expectedOutput = [
      { col1: 1, col2: 10, name: 'col3', value: 'a' },
      { col1: 1, col2: 10, name: 'col4', value: 'aa' },
      { col1: 1, col2: 10, name: 'col5', value: 'aaa' },
      { col1: 2, col2: 20, name: 'col3', value: 'b' },
      { col1: 2, col2: 20, name: 'col4', value: 'bb' },
      { col1: 2, col2: 20, name: 'col5', value: 'bbb' },
      { col1: 3, col2: 30, name: 'col3', value: 'c' },
      { col1: 3, col2: 30, name: 'col4', value: 'cc' },
      { col1: 3, col2: 30, name: 'col5', value: 'ccc' }
    ]

    expect(output).toEqual(expectedOutput)
  })
})

describe('pivotLonger: transformer', () => {
  it('mutate + pivotLonger + filter', () => {
    const xf = compose(
      mutate({ col2: ({ col1, col2 }) => col2 - col1 }),
      pivotLonger(pivotInstructions),
      filter(row => row.col2 > 9)
    )

    const output = into([], xf, input)

    const expectedOutput = [
      { col1: 2, col2: 18, name: 'col3', value: 'b' },
      { col1: 2, col2: 18, name: 'col4', value: 'bb' },
      { col1: 2, col2: 18, name: 'col5', value: 'bbb' },
      { col1: 3, col2: 27, name: 'col3', value: 'c' },
      { col1: 3, col2: 27, name: 'col4', value: 'cc' },
      { col1: 3, col2: 27, name: 'col5', value: 'ccc' }
    ]

    expect(output).toEqual(expectedOutput)
  })
})

describe('pivotLonger: bug', () => {
  test('bug in DataContainer: lengths becomes weird w/ column oriented data', () => {
    const input = {
      col1: [1, 2, 3],
      col2: [10, 20, 30],
      col3: ['a', 'b', 'c'],
      col4: ['aa', 'bb', 'cc'],
      col5: ['aaa', 'bbb', 'ccc']
    }

    const output = into(
      columnOriented.accumulator(),
      pivotLonger(pivotInstructions),
      columnOriented.wrap(input)
    )

    const expectedOutput = {
      col1: [1, 1, 1, 2, 2, 2, 3, 3, 3],
      col2: [10, 10, 10, 20, 20, 20, 30, 30, 30],
      name: ['col3', 'col4', 'col5', 'col3', 'col4', 'col5', 'col3', 'col4', 'col5'],
      value: ['a', 'aa', 'aaa', 'b', 'bb', 'bbb', 'c', 'cc', 'ccc']
    }

    expect(output).toEqual(expectedOutput)
  })
})
