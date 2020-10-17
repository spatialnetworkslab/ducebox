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
    const expectedData = {
      fruit: ['apple', 'apricot', 'banana', 'blueberry', 'cherry', 'coconut', 'date', 'durian'],
      price: [3.8, 5.4, 5.1, 3.3, 4.4, 5.2, 5.9, 7.5],
      dayOfSale: [5, 2, 3, 7, 1, 4, 9, 8].map(day)
    }

    const transformation = arrange(ascendingStr('fruit'))

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('categorical (descending)', () => {
    const expectedData = {
      fruit: ['apple', 'apricot', 'banana', 'blueberry', 'cherry', 'coconut', 'date', 'durian'].reverse(),
      price: [3.8, 5.4, 5.1, 3.3, 4.4, 5.2, 5.9, 7.5].reverse(),
      dayOfSale: [5, 2, 3, 7, 1, 4, 9, 8].reverse().map(day)
    }

    const transformation = arrange(descendingStr('fruit'))

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('temporal (ascending)', () => {
    const expectedData = {
      fruit: ['cherry', 'apricot', 'banana', 'coconut', 'apple', 'blueberry', 'durian', 'date'],
      price: [4.4, 5.4, 5.1, 5.2, 3.8, 3.3, 7.5, 5.9],
      dayOfSale: [1, 2, 3, 4, 5, 7, 8, 9].map(day)
    }

    const transformation = arrange(ascending('dayOfSale'))

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('temporal (descending)', () => {
    const expectedData = {
      fruit: ['cherry', 'apricot', 'banana', 'coconut', 'apple', 'blueberry', 'durian', 'date'].reverse(),
      price: [4.4, 5.4, 5.1, 5.2, 3.8, 3.3, 7.5, 5.9].reverse(),
      dayOfSale: [1, 2, 3, 4, 5, 7, 8, 9].reverse().map(day)
    }

    const transformation = arrange(descending('dayOfSale'))

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('numeric (ascending) + categorical (descending)', () => {
    const testDataMulti = {
      fruit: ['apple', 'apple', 'banana', 'banana'],
      price: [2, 3, 2, 3]
    }

    const expectedData = {
      fruit: ['banana', 'apple', 'banana', 'apple'],
      price: [2, 2, 3, 3]
    }

    const transformation = arrange(ascending('price'), descendingStr('fruit'))

    expect(transformation(testDataMulti)).toEqual(expectedData)
  })

  test('temporal (descending) + categorical (ascending)', () => {
    const testDataMulti = {
      fruit: ['apple', 'apple', 'banana', 'banana'],
      dayOfSale: [2, 4, 2, 4].map(day)
    }

    const expectedData = {
      fruit: ['apple', 'banana', 'apple', 'banana'],
      dayOfSale: [4, 4, 2, 2].map(day)
    }

    const transformation = arrange(descending('dayOfSale'), ascendingStr('fruit'))

    expect(transformation(testDataMulti)).toEqual(expectedData)
  })

  test('custom compareFunction', () => {
    const testDataCustom = {
      col1: [1, 30, 4, 21, 100000],
      col2: ['a', 'b', 'c', 'd', 'e']
    }

    const expectedData = {
      col1: [1, 100000, 21, 30, 4],
      col2: ['a', 'e', 'd', 'b', 'c']
    }

    const customCompareFn = (a, b) => {
      const sorted = [a, b].map(x => x.toString()).sort()
      return sorted[0] === a.toString() ? -1 : 1
    }

    const transformation = arrange({ col1: customCompareFn })

    expect(transformation(testDataCustom)).toEqual(expectedData)
  })
})
