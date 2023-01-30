const generate = <T>(len: number, generator: () => T) => {
  return [...Array(len).fill(0).map(generator)];
};

const asyncGenerate = async <T>(
  len: number,
  generator: () => T,
  timeout = 200
) => {
  return new Promise<T[]>((res) => {
    setTimeout(() => res(generate(len, generator)), timeout);
  });
};

export { generate, asyncGenerate };
