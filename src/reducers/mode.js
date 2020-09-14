export function mode (array) {
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

export const foldableMode = {
  startValue: {},
  fold (currentValue, previousValue) {
    if (currentValue in previousValue) {
      previousValue[currentValue]++
    } else {
      previousValue[currentValue] = 1
    }

    return previousValue
  },
  finally (value, length) {
    let maxCount = 0
    let maxElement

    for (const element in value) {
      const count = value[element]

      if (maxCount < count) {
        maxCount = count
        maxElement = element
      }
    }

    return parseInt(maxElement)
  }
}
