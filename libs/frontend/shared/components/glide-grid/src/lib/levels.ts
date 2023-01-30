import type { StringKeys } from './types/general';

class Levels<T> {
  private readonly levelSets = new Map<StringKeys<T>, Set<string>>();
  private readonly keys: StringKeys<T>[] = [];
  constructor(keys: StringKeys<T>[]) {
    for (const key of keys) {
      this.keys.push(key);
      this.levelSets.set(key, new Set());
    }
  }

  addToLevel(key: StringKeys<T>, value: string) {
    this.getSet(key).add(value);
  }

  processItem(item: T) {
    for (const key of this.keys) {
      const set = this.getSet(key);
      set.add(item[key] as string);
    }
  }

  private getSet(key: StringKeys<T>) {
    const set = this.levelSets.get(key);
    if (!set) {
      throw new Error('Key should exist: ' + key);
    }
    return set;
  }

  getLevels(key: StringKeys<T>): string[] {
    return Array.from(this.getSet(key));
  }
}

export { Levels };
