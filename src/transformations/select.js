import { curryN, into } from 'ramda'

import _dispatchable from '../internal/_dispatchable.js'
import _xfBase from '../internal/_xfBase.js'

const _xselect = curryN(2, function _xselect (columns, xf) {
  return new XSelect(columns, xf)
})

const select = curryN(2, _dispatchable([], _xselect,
  function (columns, df) {
    return into(
      [],
      select(columns),
      df
    )
  }
))

export default select

function XSelect (columns, xf) {
  this.columns = columns
  this.xf = xf
}

XSelect.prototype['@@transducer/init'] = _xfBase.init
XSelect.prototype['@@transducer/result'] = _xfBase.result
XSelect.prototype['@@transducer/step'] = function (acc, row) {
  const newRow = {}

  for (let i = 0; i < this.columns.length; i++) {
    const columnName = this.columns[i]
    newRow[columnName] = row[columnName]
  }

  return this.xf['@@transducer/step'](acc, newRow)
}
