type Indexable = { [key: string]: unknown };
type ObjectValues<T> = T[keyof T];
type StringKeys<T> = Extract<keyof T, string>;

export type { Indexable, ObjectValues, StringKeys };
