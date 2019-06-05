export abstract class Tree<T> {
  protected _nodesCount: number = 0;

  public get nodesCount(): number {
    return this._nodesCount;
  }
}
