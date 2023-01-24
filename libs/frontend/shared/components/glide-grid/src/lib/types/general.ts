type Indexable = { [key: string]: unknown };
type ObjectValues<T> = T[keyof T];

export type { Indexable, ObjectValues };
