const generate = <T>(len: number, generator: () => T) => {
  return [...Array(100).fill(0).map(generator)];
};

const asyncGenerate = async <T>(
  len: number,
  generator: () => T,
  timeout = 200
) => {
  return new Promise((res) => {
    setTimeout(() => res(generate(len, generator)), timeout);
  });
};

export { generate, asyncGenerate };
