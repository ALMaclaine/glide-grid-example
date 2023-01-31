const filterLevels = (value: string, levels: string[]) =>
  levels.includes(value);

const generateFilterLevels = (levels: string[]) => (value: string) =>
  filterLevels(value, levels);

const filterMin = (value: number, min: number) => value >= min;

const generateFilterMin = (min: number) => (value: number) =>
  filterMin(value, min);

const filterMax = (value: number, max: number) => value <= max;

const generateFilterMax = (max: number) => (value: number) =>
  filterMax(value, max);

const filterRange = (value: number, min: number, max: number) =>
  value >= min && value <= max;

const generateFilterRange = (min: number, max: number) => (value: number) =>
  filterRange(value, min, max);

export {
  generateFilterRange,
  generateFilterMax,
  generateFilterLevels,
  generateFilterMin,
};
