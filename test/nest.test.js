import { pipe, columnOriented, groupBy, nest } from '../src'

describe('nest', () => {
  test('nest with one grouped column works', () => {
    const inputData = {
      a: [1, 2, 3, 4],
      b: ['a', 'b', 'a', 'b']
    }

    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [
        groupBy('b'),
        nest('$grouped')
      ]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      b: ['a', 'b'],
      $grouped: [
        { a: [1, 3], b: ['a', 'a'] },
        { a: [2, 4], b: ['b', 'b'] }
      ]
    })
  })

  test('nest with two grouped columns works', () => {
    const inputData = {
      a: ['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b'],
      b: ['c', 'd', 'c', 'd', 'c', 'd', 'c', 'd'],
      c: [1, 2, 3, 4, 5, 6, 7, 8]
    }

    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [
        groupBy('a', 'b'),
        nest('$grouped')
      ]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      a: ['a', 'a', 'b', 'b'],
      b: ['c', 'd', 'c', 'd'],
      $grouped: [
        { a: ['a', 'a'], b: ['c', 'c'], c: [1, 3] },
        { a: ['a', 'a'], b: ['d', 'd'], c: [2, 4] },
        { a: ['b', 'b'], b: ['c', 'c'], c: [5, 7] },
        { a: ['b', 'b'], b: ['d', 'd'], c: [6, 8] }
      ]
    })
  })
})
