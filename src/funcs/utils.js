export const isNullOrUndefined = (value) =>
  value === null || value === undefined;

export const isExists = (value) => !isNullOrUndefined(value);

export const nullIfNotExists = (value, ifExist) =>
  isExists(value) ? ifExist(value) || value : null;
