import { pipe, rowOriented, columnOriented, select, filter, mutate, groupBy, nest } from '../src'

describe('rowOriented', () => {
  test('rowOriented -> rowOriented', () => {
    const inputData = [
      { a: 1, b: 'a', c: 1 },
      { a: 2, b: 'b', c: 2 },
      { a: 3, b: 'a', c: 3 },
      { a: 4, b: 'b', c: 4 },
      { a: 5, b: 'c', c: 5 },
      { a: 6, b: 'd', c: 6 },
      { a: 7, b: 'c', c: 7 },
      { a: 8, b: 'd', c: 8 }
    ]

    const transform = pipe({
      input: rowOriented,
      output: rowOriented,
      transformations: [select('a', 'b')]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual([
      { a: 1, b: 'a' },
      { a: 2, b: 'b' },
      { a: 3, b: 'a' },
      { a: 4, b: 'b' },
      { a: 5, b: 'c' },
      { a: 6, b: 'd' },
      { a: 7, b: 'c' },
      { a: 8, b: 'd' }
    ])
  })

  test('columnOriented -> rowOriented', () => {
    const inputData = {
      a: [1, 2, 3, 4, 5, 6, 7, 8],
      b: ['a', 'b', 'a', 'b', 'c', 'd', 'c', 'd']
    }

    const transform = pipe({
      input: columnOriented,
      output: rowOriented,
      transformations: [
        filter(row => ['a', 'c'].includes(row.b)),
        mutate('a', row => row.a * 10),
        filter(row => row.a > 20)
      ]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual([
      { a: 30, b: 'a' },
      { a: 50, b: 'c' },
      { a: 70, b: 'c' }
    ])
  })

  test('rowOriented -> columnOriented', () => {
    const inputData = [
      { a: 'a', b: 'c', c: 1 },
      { a: 'a', b: 'd', c: 2 },
      { a: 'a', b: 'c', c: 3 },
      { a: 'a', b: 'd', c: 4 },
      { a: 'b', b: 'c', c: 5 },
      { a: 'b', b: 'd', c: 6 },
      { a: 'b', b: 'c', c: 7 },
      { a: 'b', b: 'd', c: 8 }
    ]

    const transform = pipe({
      input: rowOriented,
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
