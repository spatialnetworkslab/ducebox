import _dispatchable from './internal/_dispatchable.js';
import _xfBase from './internal/_xfBase.js';
import reduce from './reduce.js';
import curryN from './curryN.js';
import compose from './compose.js';
import into from './into.js';

function XDenest(nestColName, nestWrapper, xf) {
  this.nestColName = nestColName;
  this.nestWrapper = nestWrapper;
  this.xf = xf;
  this.outerColumns = [];

  this['@@transducer/step'] = this._initStep;
}

XDenest.prototype['@@transducer/init'] = _xfBase.init;
XDenest.prototype['@@transducer/result'] = _xfBase.result;

XDenest.prototype._initStep = function(result, input) {
  for (const columnName in input) {
    if (columnName !== this.nestColName) {
      this.outerColumns.push(columnName);
    }
  }

  this['@@transducer/step'] = this._step;
  return this['@@transducer/step'](result, input);
};

XDenest.prototype._step = function(outerResult, outerInput) {
  const nestedData = outerInput[this.nestColName];

  const outerInputWithoutNested = Object.assign({}, outerInput);
  delete outerInputWithoutNested[this.nestColName];

  return reduce(
    (innerResult, innerInput) => this.xf[['@@transducer/step']](
      innerResult,
      _attach(innerInput, outerInputWithoutNested)
    ),
    outerResult,
    this.nestWrapper(nestedData)
  );
};

var _xdenest = curryN(3, function _xdenest(nestColName, nestWrapper, xf) {
  return new XDenest(nestColName, nestWrapper, xf);
});

var denest = curryN(3, _dispatchable([], _xdenest,
  function(nestColName, nestWrapper, list) {
    return into(
      [],
      compose(denest(nestColName, nestWrapper)),
      list
    );
  }
));

export default denest;

function _attach(innerRow, outerRow) {
  const newRow = Object.assign({}, innerRow);

  for (const columnName in outerRow) {
    newRow[columnName] = outerRow[columnName];
  }

  return newRow;
}
