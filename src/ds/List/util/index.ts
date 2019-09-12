export class NNode<T> {
  value: T | null;
  next: NNode<T> | null;

  constructor(value: T | null) {
    this.value = value;
    this.next = null;
  }
}
