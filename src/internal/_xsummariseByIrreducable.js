import _xfBase from './_xfBase.js'

function XSummariseByIrreducable (f, by, xf) {
  this.f = f
  this.by = by
  this.xf = xf
}

XSummariseByIrreducable.prototype['@@transducer/init'] = _xfBase.init

XSummariseByIrreducable.prototype['@@transducer/result'] = result => {

}

XSummariseByIrreducable.prototype['@@transducer/step'] = (acc, row) => {

}
