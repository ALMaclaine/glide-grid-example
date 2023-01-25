const sortNumeric = (num1: string, num2: string) =>
  parseFloat(num1) - parseFloat(num2);
const sortDates = (date1: string, date2: string) =>
  sortNumeric(`${new Date(date1).getTime()}`, `${new Date(date2).getTime()}`);

const naturalSort = (x: string, y: string) => {
  if (x < y) return -1;
  if (y > x) return 1;
  return 0;
};

export { sortDates, sortNumeric, naturalSort };
