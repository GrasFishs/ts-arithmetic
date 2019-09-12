import { Queue } from './Queue';

export class ArrayQueue<T> extends Queue<T> {
  private array: T[] = [];

  enqueue(value: T): void {
    this.array.push(value);
    this._length++;
  }
  dequeue(): T | null {
    if (!this.isEmpty()) {
      this._length--;
      return this.array.shift() as T;
    }
    return null;
  }
  top(): T | null {
    if (!this.isEmpty()) {
      return this.array[0];
    }
    return null;
  }

  public static from<T>(arr: T[]): ArrayQueue<T> {
    const queue = new ArrayQueue<T>();
    for (let i = 0; i < arr.length; i++) {
      queue.enqueue(arr[i]);
    }
    return queue;
  }

  toArray(): T[] {
    const a: T[] = [];
    for (let i = 0; i < this.array.length; i++) {
      a.push(this.array[i]);
    }
    return a;
  }
}
