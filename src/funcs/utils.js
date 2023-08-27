export const isNullOrUndefined = (value) =>
  value === null || value === undefined;

export const isExists = (value) => !isNullOrUndefined(value);

export const nullIfNotExists = (value, ifExist) =>
  isExists(value) ? ifExist(value) || value : null;

export const copyText = (value) => {
  navigator.clipboard.writeText(value);
};

export const objectMap = (object, fn) => {
  return Object.entries(object).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: fn(value),
    }),
    {}
  );
};

export const removeDuplication = (array) => Array.from(new Set(array));

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const monthParser = (month) => {
  const [yy, mm] = month.split(".");
  return `20${yy}년 ${Number(mm)}월`;
};
