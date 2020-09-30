import { mutate } from '../../src'

const testData = {
  fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
  price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9]
}

describe('transformations: mutate', () => {
  test('creates new column as expected', () => {
    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9],
      discountedPrice: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map(p => p - 1)
    }

    const transformation = mutate({ discountedPrice: row => row.price - 1 })

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('overwriting column leaves original data intact', () => {
    const testDataOriginal = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9]
    }

    const testDataCopy = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9]
    }

    const transformation = mutate({ price: row => row.price + 1 })

    transformation(testDataCopy)

    expect(testDataCopy).toEqual(testDataOriginal)
  })

  test('overwrites existing column as expected', () => {
    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map(p => p + 1)
    }

    const transformation = mutate({ price: row => row.price + 1 })

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('allows using column directly after creating it', () => {
    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9],
      discountedPrice: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map(p => p - 1),
      doubleDiscountedPrice: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map(p => p - 1).map(p => p - 1)
    }

    const transformation = mutate(
      { discountedPrice: row => row.price - 1 },
      { doubleDiscountedPrice: row => row.discountedPrice - 1 }
    )

    expect(transformation(testData)).toEqual(expectedData)
  })
})
