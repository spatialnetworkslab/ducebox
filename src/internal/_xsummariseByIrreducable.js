import _xfBase from './_xfBase.js'

function XSummariseByIrreducable (f, by, xf) {
  this.f = f
  this.by = by
  this.xf = xf
}

XSummariseByIrreducable.prototype['@@transducer/init'] = _xfBase.init

XSummariseByIrreducable.prototype['@@transducer/result'] = function (result) {

}

XSummariseByIrreducable.prototype['@@transducer/step'] = function (acc, row) {

}
