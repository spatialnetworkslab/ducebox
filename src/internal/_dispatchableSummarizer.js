export default function _dispatchableSummarizer (transducerCreator, fn) {
  return function (...args) {
    return args[0] === undefined
      ? transducerCreator()
      : fn(args[0])
  }
}
