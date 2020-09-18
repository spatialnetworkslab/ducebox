import { filterBy, mean } from '../../src'

const testData = {
  fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
  price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9]
}

const priceGreaterThanMean = cols => {
  const meanPrice = mean(cols.price)
  return row => row.price > meanPrice
}

describe('transformations: filterBy', () => {
  test('filterBy works without providing by', () => {
    const expectedData = {
      fruit: ['coconut', 'banana', 'banana', 'apple', 'durian'],
      price: [5.2, 5.1, 7.5, 5.4, 5.9]
    }

    const transformation = filterBy(priceGreaterThanMean)

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('filterBy works if by is empty array', () => {
    const expectedData = {
      fruit: ['coconut', 'banana', 'banana', 'apple', 'durian'],
      price: [5.2, 5.1, 7.5, 5.4, 5.9]
    }

    const transformation = filterBy(priceGreaterThanMean, [])

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('filterBy works with one by column', () => {
    const expectedData = {
      fruit: ['coconut', 'banana', 'apple', 'durian'],
      price: [5.2, 7.5, 5.4, 5.9]
    }

    const transformation = filterBy(priceGreaterThanMean, ['fruit'])

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('filterBy works with two by columns', () => {
    const moreElaborateTestData = {
      fruit: ['coconut', 'coconut', 'coconut', 'coconut', 'banana', 'banana', 'banana', 'banana'],
      origin: ['brazil', 'brazil', 'uganda', 'uganda', 'brazil', 'brazil', 'uganda', 'uganda'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9]
    }

    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana'],
      origin: ['brazil', 'uganda', 'brazil', 'uganda'],
      price: [5.2, 7.5, 5.4, 5.9]
    }

    const transformation = filterBy(priceGreaterThanMean, ['fruit', 'origin'])

    expect(transformation(moreElaborateTestData)).toEqual(expectedData)
  })
})
