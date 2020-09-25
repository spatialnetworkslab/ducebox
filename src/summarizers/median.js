import { enableColumnNameSyntax } from './_curry.js'

// Translated to JavaScript from https://rcoh.me/posts/linear-time-median-finding/
let median = function (array) {
  const len = array.length

  if (len === 1) return array[0]

  if (len % 2 === 1) {
    return quickselect(array, len / 2)
  } else {
    return 0.5 * (
      quickselect(array, (len / 2) - 1) +
      quickselect(array, len / 2)
    )
  }
}

median = enableColumnNameSyntax(median)

export { median }

function quickselect (array, k) {
  const pivot = pickPivot(array)

  const lows = []
  const highs = []
  const pivots = []

  for (let i = 0; i < array.length; i++) {
    const element = array[i]

    if (element < pivot) {
      lows.push(element)
    } else if (element > pivot) {
      highs.push(element)
    } else {
      pivots.push(element)
    }
  }

  if (k < lows.length) {
    return quickselect(lows, k)
  } else if (k < lows.length + pivots.length) {
    return pivots[0]
  } else {
    return quickselect(highs, k - lows.length - pivots.length)
  }
}

function pickPivot (array) {
  if (array.length < 5) {
    return nlogMedian(array)
  }

  const medians = getMediansOfChunks(array, 5)

  return median(medians)
}

function nlogMedian (array) {
  array.sort((a, b) => a - b)

  const len = array.length

  if (len % 2 === 1) {
    return array[len / 2]
  } else {
    return 0.5 * (array[(len / 2) - 1] + array[len / 2])
  }
}

function getMediansOfChunks (array, chunkSize) {
  const medians = []

  for (let i = 0; i < array.length; i = i + chunkSize) {
    if (i + chunkSize > array.length) {
      break
    }

    const chunk = []

    for (let j = 0; j < chunkSize; j++) {
      chunk.push(array[i + j])
    }

    chunk.sort((a, b) => a - b)

    medians.push(chunk[2])
  }

  return medians
}
