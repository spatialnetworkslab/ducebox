const _xfilterByIrreducable = (summariseFn, predicate, by, xf) => {
  return new XFilterByIrreducable(summariseFn, predicate, by, xf)
}

export default _xfilterByIrreducable

function XFilterByIrreducable (summariseFn, by, xf) {}
