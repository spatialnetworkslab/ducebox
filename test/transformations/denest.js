var eq = require('./shared/eq');
var R = require('../source');

const data = [
  { c1: 'a', c2: 'a', nested: [
    { c3: 1 },
    { c3: 3 }
  ] },

  { c1: 'a', c2: 'b', nested: [
    { c3: 2 },
    { c3: 4 }
  ] },

  { c1: 'b', c2: 'a', nested: [
    { c3: 5 },
    { c3: 7 }
  ] },

  { c1: 'b', c2: 'b', nested: [
    { c3: 6 },
    { c3: 8 }
  ] }
];

describe('denest: standalone', () => {
  it('works', () => {
    const expectedResult = [
      { c1: 'a', c2: 'a', c3: 1 },
      { c1: 'a', c2: 'a', c3: 3 },
      { c1: 'a', c2: 'b', c3: 2 },
      { c1: 'a', c2: 'b', c3: 4 },
      { c1: 'b', c2: 'a', c3: 5 },
      { c1: 'b', c2: 'a', c3: 7 },
      { c1: 'b', c2: 'b', c3: 6 },
      { c1: 'b', c2: 'b', c3: 8 }
    ];

    eq(R.denest('nested', x => x, data), expectedResult);
  });
});

describe('denest: transformer', () => {
  it('mutate + filter + denest', () => {
    const xf = R.compose(
      R.mutate({ c1: row => row.c1 + 'x' }),
      R.filter(row => row.c1 !== 'bx'),
      R.denest('nested', x => x)
    );

    const result = R.into([], xf, data);

    const expectedResult = [
      { c1: 'ax', c2: 'a', c3: 1 },
      { c1: 'ax', c2: 'a', c3: 3 },
      { c1: 'ax', c2: 'b', c3: 2 },
      { c1: 'ax', c2: 'b', c3: 4 }
    ];

    eq(result, expectedResult);
  });

  it('denest + mutate + filter', () => {
    const xf = R.compose(
      R.denest('nested', x => x),
      R.mutate({ c1: row => row.c1 + 'x' }),
      R.filter(row => row.c1 !== 'bx')
    );

    const result = R.into([], xf, data);

    const expectedResult = [
      { c1: 'ax', c2: 'a', c3: 1 },
      { c1: 'ax', c2: 'a', c3: 3 },
      { c1: 'ax', c2: 'b', c3: 2 },
      { c1: 'ax', c2: 'b', c3: 4 }
    ];

    eq(result, expectedResult);
  });
});
