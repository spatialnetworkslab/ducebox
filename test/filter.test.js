import { pipe, columnOriented, filter, mutate } from '../src'

const inputData = {
  a: [1, 2, 3, 4, 5, 6, 7, 8],
  b: ['a', 'b', 'a', 'b', 'c', 'd', 'c', 'd']
}

describe('filter', () => {
  test('single filter removes the correct elements', () => {
    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [filter(row => row.a > 2)]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      a: [3, 4, 5, 6, 7, 8],
      b: ['a', 'b', 'c', 'd', 'c', 'd']
    })
  })

  test('multiple filters remove the correct elements', () => {
    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [
        filter(row => row.a > 2),
        filter(row => ['a', 'c'].includes(row.b))
      ]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      a: [3, 5, 7],
      b: ['a', 'c', 'c']
    })
  })

  test('multiple filters work in combination with mutate', () => {
    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [
        filter(row => ['a', 'c'].includes(row.b)),
        mutate('a', row => row.a * 10),
        filter(row => row.a > 20)
      ]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      a: [30, 50, 70],
      b: ['a', 'c', 'c']
    })
  })
})
