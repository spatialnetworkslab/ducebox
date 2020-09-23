export function pipe (...args) {
  const fns = parsePipeArgs(args)

  return function (data) {
    return fns.reduce((res, func) => func(res), data)
  }
}

export function parsePipeArgs (args) {
  return args[0].constructor === Array
    ? args[0]
    : args
}
