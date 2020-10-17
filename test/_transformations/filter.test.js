import { filter } from '../../src'

const testData = {
  col1: [1, 2, 3, 4, 5],
  col2: ['a', 'b', 'c', 'd', 'e']
}

describe('transformations: filter', () => {
  test('works as expected (1)', () => {
    const expectedData = {
      col1: [3, 4, 5],
      col2: ['c', 'd', 'e']
    }

    const transformation = filter(row => row.col1 > 2)

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('works as expected (2)', () => {
    const expectedData = testData

    const transformation = filter(row => row.col1 < 6)

    expect(transformation(testData)).toEqual(expectedData)
  })
})
