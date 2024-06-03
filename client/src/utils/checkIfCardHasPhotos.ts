export const checkIfCardHasPhotos = (
  a: 0 | 1 | undefined,
  b: 0 | 1 | undefined,
  c: 0 | 1 | undefined,
  d: 0 | 1 | undefined
) => {
  if (
    a === (undefined || 0) &&
    b === (undefined || 0) &&
    c === (undefined || 0) &&
    d === (undefined || 0)
  ) {
    return 0;
  }
  return 1;
};
