import { take } from 'ramda'

import {
  columnOriented,
  compose,
  filter,
  mutate,
  into
} from '../../src/index.js'

const rowData = [
  { fruit: 'apple', quantity: 10 },
  { fruit: 'banana', quantity: 5 },
  { fruit: 'coconut', quantity: 8 },
  { fruit: 'durian', quantity: 6 },
  { fruit: 'elderberry', quantity: 7 },
  { fruit: 'fig', quantity: 11 }
]

const colData = {
  fruit: ['apple', 'banana', 'coconut', 'durian', 'elderberry', 'fig'],
  quantity: [10, 5, 8, 6, 7, 11]
}

const notApple = row => row.fruit !== 'apple'
const isOdd = colName => row => row[colName] % 2 === 1

const transform = compose(
  filter(notApple),
  mutate({ tripleQuantity: row => row.quantity * 3 }),
  filter(isOdd('tripleQuantity')),
  take(2)
)

const expectedRowData = [
  { fruit: 'banana', quantity: 5, tripleQuantity: 15 },
  { fruit: 'elderberry', quantity: 7, tripleQuantity: 21 }
]

const expectedColData = {
  fruit: ['banana', 'elderberry'],
  quantity: [5, 7],
  tripleQuantity: [15, 21]
}

describe('columnOriented: input and output', () => {
  test('row -> row', () => {
    expect(into([], transform, rowData)).toEqual(expectedRowData)
  })

  test('col -> row', () => {
    const iterable = columnOriented.iterable(colData)

    expect(into([], transform, iterable)).toEqual(expectedRowData)
  })

  test('row -> col', () => {
    const accumulator = columnOriented.accumulator()

    expect(into(accumulator, transform, rowData)).toEqual(expectedColData)
  })

  test('col -> col', () => {
    const iterable = columnOriented.iterable(colData)
    const accumulator = columnOriented.accumulator()

    expect(into(accumulator, transform, iterable)).toEqual(expectedColData)
  })
})
