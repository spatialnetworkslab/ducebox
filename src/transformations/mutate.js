import map from './map.js';

export default function mutate(mutateInstructions, functor) {
  const mapFn = getMapFn(mutateInstructions);
  return functor
    ? map(mapFn, functor)
    : map(mapFn);
}

function getMapFn(mutateInstructions) {
  return row => {
    const newRow = Object.assign({}, row);

    for (const newColumnName in mutateInstructions) {
      newRow[newColumnName] = mutateInstructions[newColumnName](newRow);
    }

    return newRow;
  };
}
