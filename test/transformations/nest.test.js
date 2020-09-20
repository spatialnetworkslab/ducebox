import { nest } from '../../src'

const testData = {
  fruit: ['coconut', 'coconut', 'banana', 'banana', 'apple', 'apple', 'durian', 'durian'],
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

  // test('works grouped by 1 column and construct fn', () => {

  // })

  // test('works grouped by 2 columns', () => {

  // })

  // test('works grouped by 2 columns and construct fn', () => {

  // })
})
