import { List } from "../List";

export abstract class LinearList<T> extends List{
  abstract get(index: number): T | null;

  abstract set(index: number, value: T): boolean;

  abstract remove(index: number): boolean;

  abstract clear(): void;

  public get length() {
    return this._length;
  }
}
