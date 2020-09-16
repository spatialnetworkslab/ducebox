import {
  count,
  max,
  mean,
  median,
  min,
  mode,
  sum
} from '../src'

describe('reducers', () => {
  test('all reducers except count give null on empty array', () => {
    expect(max([])).toBeNull()
    expect(mean([])).toBeNull()
    expect(median([])).toBeNull()
    expect(min([])).toBeNull()
    expect(mode([])).toBeNull()
    expect(sum([])).toBeNull()
  })

  test('count gives correct value', () => {
    expect(count([10, 20, 30])).toBe(3)
  })

  test('max gives correct value', () => {
    expect(max([1, 5, 2, 3])).toBe(5)
  })

  test('mean gives correct value', () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3)
  })

  test('median gives correct value for odd array length', () => {
    expect(median([3, 20, 7, 8, 1, 1, 21])).toBe(7)
  })

  test('median gives correct value for even array length', () => {
    expect(median([3, 20, 7, 8, 1, 22, 1, 21])).toBe(7.5)
  })

  test('min gives correct value', () => {
    expect(min([0, 1, 4, -2, 3])).toBe(-2)
  })

  test('mode works with only one element', () => {
    expect(mode([3])).toBe(3)
  })

  test('mode gives correct value when only one answer', () => {
    expect(mode([1, 1, 2, 2, 2, 3, 3, 4, 5, 5])).toBe(2)
  })

  test('mode gives lowest answer when multiple answers', () => {
    expect(mode([3, 3, 3, 2, 2, 1, 1, 1, 4, 4])).toBe(1)
  })

  test('sum gives correct value', () => {
    expect(sum([1, 2, 3])).toBe(6)
  })
})
