import { pivotWider } from '../../src'

describe('transformations: pivotWider', () => {
  test('works as expected (values complete)', () => {
    const testData = {
      idCol: ['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'c'],
      names: ['x', 'y', 'z', 'x', 'y', 'z', 'x', 'y', 'z'],
      values: [1, 2, 3, 10, 20, 30, 100, 200, 300]
    }

    const expectedData = {
      idCol: ['a', 'b', 'c'],
      x: [1, 10, 100],
      y: [2, 20, 200],
      z: [3, 30, 300]
    }

    const transformation = pivotWider({ namesFrom: 'names', valuesFrom: 'values' })

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('works as expected (values missing)', () => {
    const testData = {
      idCol: ['a', 'a', 'b', 'b', 'b', 'c', 'c'],
      names: ['x', 'y', 'x', 'y', 'z', 'x', 'z'],
      values: [1, 2, 10, 20, 30, 100, 300]
    }

    const expectedData = {
      idCol: ['a', 'b', 'c'],
      x: [1, 10, 100],
      y: [2, 20, null],
      z: [null, 30, 300]
    }

    const transformation = pivotWider({ namesFrom: 'names', valuesFrom: 'values' })

    expect(transformation(testData)).toEqual(expectedData)
  })

  test('works as expected with custom fill value', () => {
    const testData = {
      idCol: ['a', 'a', 'b', 'b', 'b', 'c', 'c'],
      names: ['x', 'y', 'x', 'y', 'z', 'x', 'z'],
      values: [1, 2, 10, 20, 30, 100, 300]
    }

    const expectedData = {
      idCol: ['a', 'b', 'c'],
      x: [1, 10, 100],
      y: [2, 20, NaN],
      z: [NaN, 30, 300]
    }

    const transformation = pivotWider({
      namesFrom: 'names',
      valuesFrom: 'values',
      valuesFill: NaN
    })

    expect(transformation(testData)).toEqual(expectedData)
  })
})
