const generate = <T>(len: number, generator: () => T) => {
  return [...Array(100).fill(0).map(generator)];
};

export { generate };
