var eq = require('./shared/eq');
var R = require('../source');

const data = [
  { c1: 'a', c2: 'a', c3: 10 },
  { c1: 'a', c2: 'b', c3: 20 },
  { c1: 'a', c2: 'a', c3: 30 },
  { c1: 'a', c2: 'b', c3: 40 },
  { c1: 'b', c2: 'a', c3: 50 },
  { c1: 'b', c2: 'b', c3: 60 },
  { c1: 'b', c2: 'a', c3: 70 },
  { c1: 'b', c2: 'b', c3: 80 },
  { c1: 'c', c2: 'a', c3: 90 },
  { c1: 'c', c2: 'b', c3: 100 },
  { c1: 'c', c2: 'a', c3: 110 },
  { c1: 'c', c2: 'b', c3: 120 }
];

describe('nest: standalone', () => {
  it('works', () => {
    const expectedResult = [
      { c1: 'a', c2: 'a', nested: [
        { c3: 10 },
        { c3: 30 }
      ] },

      { c1: 'a', c2: 'b', nested: [
        { c3: 20 },
        { c3: 40 }
      ] },

      { c1: 'b', c2: 'a', nested: [
        { c3: 50 },
        { c3: 70 }
      ] },

      { c1: 'b', c2: 'b', nested: [
        { c3: 60 },
        { c3: 80 }
      ] },

      { c1: 'c', c2: 'a', nested: [
        { c3: 90 },
        { c3: 110 }
      ] },

      { c1: 'c', c2: 'b', nested: [
        { c3: 100 },
        { c3: 120 }
      ] }
    ];

    eq(
      R.nest('nested', [], ['c1', 'c2'], data),
      expectedResult
    );
  });
});

describe('nest: transformer', () => {
  it('mutate + filter + nest', () => {
    const xf = R.compose(
      R.mutate({ c3: row => row.c3 / 10 }),
      R.filter(row => row.c1 !== 'c'),
      R.nest('nested', [], ['c1', 'c2'])
    );

    const result = R.into([], xf, data);

    const expectedResult = [
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

    eq(result, expectedResult);
  });

  it('mutate + filter + nest + filter', () => {
    const xf = R.compose(
      R.mutate({ c3: row => row.c3 / 10 }),
      R.filter(row => row.c1 !== 'c'),
      R.nest('nested', [], ['c1', 'c2']),
      R.filter(row => row.c1 === 'a')
    );

    const result = R.into([], xf, data);

    const expectedResult = [
      { c1: 'a', c2: 'a', nested: [
        { c3: 1 },
        { c3: 3 }
      ] },

      { c1: 'a', c2: 'b', nested: [
        { c3: 2 },
        { c3: 4 }
      ] }
    ];

    eq(result, expectedResult);
  });

  it('mutate + filter + nest + mutate', () => {
    const xf = R.compose(
      R.mutate({ c3: row => row.c3 / 10 }),
      R.filter(row => row.c1 !== 'c'),
      R.nest('nested', [], ['c1', 'c2']),
      R.mutate({ c2: row => row.c2 += 'x' })
    );

    const result = R.into([], xf, data);

    const expectedResult = [
      { c1: 'a', c2: 'ax', nested: [
        { c3: 1 },
        { c3: 3 }
      ] },

      { c1: 'a', c2: 'bx', nested: [
        { c3: 2 },
        { c3: 4 }
      ] },

      { c1: 'b', c2: 'ax', nested: [
        { c3: 5 },
        { c3: 7 }
      ] },

      { c1: 'b', c2: 'bx', nested: [
        { c3: 6 },
        { c3: 8 }
      ] }
    ];

    eq(result, expectedResult);
  });
});
