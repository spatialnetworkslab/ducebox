import { nest, toRowOriented } from '../../src'

const testData = {
  fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
  price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9]
}

const moreElaborateTestData = {
  fruit: ['coconut', 'coconut', 'coconut', 'coconut', 'banana', 'banana', 'banana', 'banana'],
  origin: ['brazil', 'brazil', 'uganda', 'uganda', 'brazil', 'brazil', 'uganda', 'uganda'],
  price: [5.2, 4.4, 5.1, 7.5, 3.8, 5.4, 3.3, 5.9]
}

describe('transformations: nest', () => {
  test('works without by', () => {
    const expectedData = {
      nested: [testData]
    }

    const transformation = nest('nested')

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('works grouped by 1 column', () => {
    const expectedData = {
      fruit: ['coconut', 'banana', 'apple', 'durian'],
      nested: [
        { price: [5.2, 4.4] },
        { price: [5.1, 7.5] },
        { price: [3.8, 5.4] },
        { price: [3.3, 5.9] }
      ]
    }

    const transformation = nest('nested', ['fruit'])

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('works grouped by 1 column and construct fn', () => {
    const expectedData = {
      fruit: ['coconut', 'banana', 'apple', 'durian'],
      nested: [
        [{ price: 5.2 }, { price: 4.4 }],
        [{ price: 5.1 }, { price: 7.5 }],
        [{ price: 3.8 }, { price: 5.4 }],
        [{ price: 3.3 }, { price: 5.9 }]
      ]
    }

    const transformation = nest('nested', ['fruit'], toRowOriented)

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('works grouped by 2 columns', () => {
    const exptectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana'],
      origin: ['brazil', 'uganda', 'brazil', 'uganda'],
      nested: [
        { price: [5.2, 4.4] },
        { price: [5.1, 7.5] },
        { price: [3.8, 5.4] },
        { price: [3.3, 5.9] }
      ]
    }

    const transformation = nest('nested', ['fruit', 'origin'])

    expect(transformation(moreElaborateTestData)).toEqual(exptectedData)
  })

  test('works grouped by 2 columns and construct fn', () => {
    const exptectedData = {
      fruit: ['coconut', 'coconut', 'banana', 'banana'],
      origin: ['brazil', 'uganda', 'brazil', 'uganda'],
      nested: [
        [{ price: 5.2 }, { price: 4.4 }],
        [{ price: 5.1 }, { price: 7.5 }],
        [{ price: 3.8 }, { price: 5.4 }],
        [{ price: 3.3 }, { price: 5.9 }]
      ]
    }

    const transformation = nest('nested', ['fruit', 'origin'], toRowOriented)

    expect(transformation(moreElaborateTestData)).toEqual(exptectedData)
  })
})
