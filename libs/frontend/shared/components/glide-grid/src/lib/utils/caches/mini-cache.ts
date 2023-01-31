class MiniCache<T> {
  private _cache?: T;

  get isDirty() {
    return this._cache === undefined;
  }

  get isClean() {
    return !this.isDirty;
  }

  dirty() {
    this._cache = undefined;
  }

  cache(val: T): T {
    this._cache = val;
    return this._cache;
  }

  getCache(): T {
    if (this._cache) {
      return this._cache;
    }
    throw new Error('Attempting to access dirty cache');
  }
}

export { MiniCache };
