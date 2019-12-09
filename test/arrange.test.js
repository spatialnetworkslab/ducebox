import { pipe, columnOriented, arrange, ascending, descending } from '../src'

describe('arrange', () => {
  test('arrange with ascending numbers works', () => {
    const inputData = {
      a: [4, 2, 3, 1],
      b: ['d', 'b', 'c', 'a']
    }

    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [arrange(ascending('a'))]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      a: [1, 2, 3, 4],
      b: ['a', 'b', 'c', 'd']
    })
  })

  test('arrange with descending numbers works', () => {
    const inputData = {
      a: [4, 2, 3, 1],
      b: ['d', 'b', 'c', 'a']
    }

    const transform = pipe({
      input: columnOriented,
      output: columnOriented,
      transformations: [arrange(descending('a'))]
    })

    const outputData = transform(inputData)

    expect(outputData).toEqual({
      a: [4, 3, 2, 1],
      b: ['d', 'c', 'b', 'a']
    })
  })
})
