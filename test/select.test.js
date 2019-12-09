import { pipe, columnOriented, select } from '../src'

const inputData = {
  a: [1, 2, 3, 4, 5, 6, 7, 8],
  b: ['a', 'b', 'a', 'b', 'c', 'd', 'c', 'd'],
  c: [1, 2, 3, 4, 5, 6, 7, 8]
}

describe('select', () => {
  test('single select removes the right columns', () => {
    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [select('a', 'b')]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      a: [1, 2, 3, 4, 5, 6, 7, 8],
      b: ['a', 'b', 'a', 'b', 'c', 'd', 'c', 'd']
    })
  })
})
