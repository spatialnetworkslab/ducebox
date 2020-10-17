import { mutateBy, mean } from '../../src'
import { roundArray } from '../round.js'

const testData = {
  fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
  price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9]
}

// const moreElaborateTestData = {

// }

const calculateMean = cols => {
  const meanPrice = mean(cols.price)
  return () => meanPrice
}

const calculateDevMean = cols => {
  const meanPrice = mean(cols.price)
  return row => row.price - meanPrice
}

describe('transformations: mutateBy', () => {
  // Same functionality as mutate
  test('creates new column as expected', () => {
    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9],
      discountedPrice: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map(p => p - 1)
    }

    const transformation = mutateBy({ discountedPrice: () => row => row.price - 1 })

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

    const transformation = mutateBy({ price: () => row => row.price + 1 })

    transformation(testDataCopy)

    expect(testDataCopy).toEqual(testDataOriginal)
  })

  test('overwrites existing column as expected', () => {
    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map(p => p + 1)
    }

    const transformation = mutateBy({ price: () => row => row.price + 1 })

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('allows using column directly after creating it', () => {
    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9],
      discountedPrice: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map(p => p - 1),
      doubleDiscountedPrice: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map(p => p - 1).map(p => p - 1)
    }

    const transformation = mutateBy(
      { discountedPrice: () => row => row.price - 1 },
      { doubleDiscountedPrice: () => row => row.discountedPrice - 1 }
    )

    expect(transformation(testData)).toEqual(expectedData)
  })

  // Calculating summary statistics for whole dataset
  test('calculates mean without by', () => {
    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9],
      meanPrice: [5.075, 5.075, 5.075, 5.075, 5.075, 5.075, 5.075, 5.075]
    }

    const transformation = mutateBy({ meanPrice: calculateMean })

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('calculates deviation from mean without by', () => {
    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9],
      devMeanPrice: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map(p => p - 5.075)
    }

    const transformation = mutateBy({ devMeanPrice: calculateDevMean })

    expect(transformation(testData)).toEqual(expectedData)
  })

  // Calculating grouped summary statistics (1 new column)
  test('calculates mean by 1 group (1 new col)', () => {
    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9],
      meanPrice: [4.8, 4.8, 6.3, 6.3, 4.6, 4.6, 4.6, 4.6]
    }

    const transformation = mutateBy({ meanPrice: calculateMean }, ['fruit'])

    const transformedData = transformation(testData)
    transformedData.meanPrice = roundArray(transformedData.meanPrice, 1)

    expect(transformedData).toEqual(expectedData)
  })

  test('calculates deviation from mean by 1 group (1 new col)', () => {
    const means = [4.8, 4.8, 6.3, 6.3, 4.6, 4.6, 4.6, 4.6]

    const expectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
      price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9],
      devMeanPrice: roundArray([5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9].map((p, i) => p - means[i]), 2)
    }

    const transformation = mutateBy({ devMeanPrice: calculateDevMean }, ['fruit'])
    const transformedData = transformation(testData)
    transformedData.devMeanPrice = roundArray(transformedData.devMeanPrice, 2)

    expect(transformedData).toEqual(expectedData)
  })

  // test('works as expected when calculating mean by 2 groups (1 new col)', () => {

  // })

  // test('works as expected when calculating deviation from mean by 2 groups (1 new col)', () => {

  // })

  // Calculating grouped summary statistics (2 new columns)
})
