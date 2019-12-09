import { pipe, columnOriented, groupBy, summarise, mean, sum } from '../src'

describe('summarise', () => {
  test('summarise works on ungrouped data', () => {
    const inputData = {
      a: [1, 2, 3, 4],
      b: [5, 6, 7, 8]
    }

    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [summarise({ sumA: sum('a'), meanB: mean('b') })]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      sumA: [10], meanB: [6.5]
    })
  })

  test('summarise works on grouped data (1 column)', () => {
    const inputData = {
      a: [1, 2, 3, 4],
      b: [5, 6, 7, 8],
      c: ['a', 'b', 'a', 'b']
    }

    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [
        groupBy('c'),
        summarise({ sumA: sum('a'), meanB: mean('b') })
      ]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      c: ['a', 'b'],
      sumA: [4, 6],
      meanB: [6, 7]
    })
  })

  test('summarise works on grouped data (2 columns)', () => {
    const inputData = {
      a: ['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b'],
      b: ['c', 'd', 'c', 'd', 'c', 'd', 'c', 'd'],
      c: [1, 2, 3, 4, 5, 6, 7, 8],
      d: [1, 2, 3, 4, 5, 6, 7, 8]
    }

    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [
        groupBy('a', 'b'),
        summarise({ sumC: sum('c'), meanD: mean('d') })
      ]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      a: ['a', 'a', 'b', 'b'],
      b: ['c', 'd', 'c', 'd'],
      sumC: [4, 6, 12, 14],
      meanD: [2, 3, 6, 7]
    })
  })
})
