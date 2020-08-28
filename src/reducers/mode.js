export function mode (array) {
  if (array.length === 0) return null

  const occurrences = getOccurrences(array)
  return findElementWithMostOccurrences(occurrences)
}

function getOccurrences (array) {
  const occurrences = {}

  for (let i = 0; i < array.length; i++) {
    const element = array[i]

    if (element in occurrences) {
      occurrences[element]++
    } else {
      occurrences[element] = 1
    }
  }

  return occurrences
}

function findElementWithMostOccurrences (occurrences) {
  let maxCount = 0
  let maxElement

  for (const element in occurrences) {
    const count = occurrences[element]

    if (maxCount < count) {
      maxCount = count
      maxElement = element
    }
  }

  return parseInt(maxElement)
}
