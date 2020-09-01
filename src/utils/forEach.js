export function forEachEntry (object, fn) {
  const newObject = {}

  for (const key in object) {
    newObject[key] = fn(object[key])
  }

  return newObject
}
