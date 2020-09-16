import { arrange, ascending, descending, ascendingStr, descendingStr } from '../../src'

const day = d => new Date(2020, 3, d)

const testData = {
  fruit: ['coconut', 'cherry', 'banana', 'durian', 'apple', 'apricot', 'blueberry', 'date'],
  price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9],
  dayOfSale: [4, 1, 3, 8, 5, 2, 7, 9].map(day)
}

describe('transformations: arrange', () => {
  test('numeric (ascending)', () => {
    const expectedData = {
      fruit: ['blueberry', 'apple', 'cherry', 'banana', 'coconut', 'apricot', 'date', 'durian'],
      price: [3.3, 3.8, 4.4, 5.1, 5.2, 5.4, 5.9, 7.5],
      dayOfSale: [7, 5, 1, 3, 4, 2, 9, 8].map(day)
    }

    const transformation = arrange(ascending('price'))

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('numeric (descending)', () => {
    const expectedData = {
      fruit: ['blueberry', 'apple', 'cherry', 'banana', 'coconut', 'apricot', 'date', 'durian'].reverse(),
      price: [3.3, 3.8, 4.4, 5.1, 5.2, 5.4, 5.9, 7.5].reverse(),
      dayOfSale: [7, 5, 1, 3, 4, 2, 9, 8].reverse().map(day)
    }

    const transformation = arrange(descending('price'))

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('categorical (ascending)', () => {

  })

  test('categorical (descending)', () => {

  })

  test('temporal (ascending)', () => {

  })

  test('temporal (descending)', () => {

  })

  test('numeric (ascending) + categorical (descending)', () => {

  })

  test('temporal (descending) + categorical (ascending)', () => {

  })

  test('custom compareFunction', () => {

  })
})
