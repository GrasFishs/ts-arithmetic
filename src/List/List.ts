export abstract class List {
  protected _length: number = 0;

  public get length() {
    return this._length;
  }

  public isEmpty(): boolean {
    return this._length === 0;
  }
}
