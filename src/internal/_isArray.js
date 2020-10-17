// Adapted from ramda: https://github.com/ramda/ramda
export default Array.isArray || function _isArray (val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]')
}
