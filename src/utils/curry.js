export function curryTransformation (transformation) {
  return function (...args) {
    return function (data) {
      return transformation(data, ...args)
    }
  }
}

export function enableColumnNameSyntax (fn) {
  return function (arg) {
    if (arg.constructor === String) {
      return { [arg]: fn }
    }

    if (arg.constrctor === Array) {
      return fn(arg)
    }
  }
}
