import type { StringKeys } from '../../types/general';
import type { Translation } from './types';

class SortTranslator<T extends object> {
  private readonly _translations: Translation<T>[] = [];
  private readonly idMap = new Map<string, number>();

  addUuid(uuid: string, id: StringKeys<T>): void {
    const length = this._translations.length;
    this.idMap.set(id, length);
    this._translations.push({ originalColumn: length, id, uuid });
  }

  getTranslation(pos: number): Translation<T> {
    if (pos > this._translations.length || pos < 0) {
      throw new Error('Out of bounds access');
    }
    return this._translations[pos];
  }

  getTranslationById(id: StringKeys<T>): Translation<T> {
    const pos = this.idMap.get(id);
    if (pos === undefined) {
      throw new Error('Invalid id');
    }
    return this.getTranslation(pos);
  }

  get length(): number {
    return this._translations.length;
  }

  private updateIdMap(translation: Translation<T>, pos: number): void {
    const { id } = translation;
    this.idMap.set(id, pos);
  }

  private shiftRight(pos1: number, pos2: number): void {
    const translateTmp = this._translations[pos2];
    for (let i = pos2; i > pos1; i--) {
      const translation = this._translations[i - 1];
      this.updateIdMap(translation, i);
      this._translations[i] = translation;
    }
    this.updateIdMap(translateTmp, pos1);
    this._translations[pos1] = translateTmp;
  }

  private shiftLeft(pos1: number, pos2: number): void {
    const translateTmp = this._translations[pos1];
    for (let i = pos1; i < pos2; i++) {
      const translation = this._translations[i + 1];
      this.updateIdMap(translation, i);
      this._translations[i] = translation;
    }
    this.updateIdMap(translateTmp, pos2);

    this._translations[pos2] = translateTmp;
  }

  swap(col1: number, col2: number): void {
    if (col1 > col2) {
      this.shiftRight(col2, col1);
    } else {
      this.shiftLeft(col1, col2);
    }
  }

  get translations(): Translation<T>[] {
    return this._translations;
  }
}

export { SortTranslator };
