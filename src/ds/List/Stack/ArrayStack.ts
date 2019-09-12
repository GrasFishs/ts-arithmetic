import { Stack } from './Stack';

export class ArrayStack<T> extends Stack<T> {
  private array: T[] = [];

  public push(value: T): void {
    this._length++;
    this.array.push(value);
  }

  public pop(): T | null {
    if (this._length > 0) {
      this._length--;
      return this.array.pop()!;
    }
    return null;
  }

  public top(): T | null {
    if (this._length > 0) {
      return this.array[this._length - 1];
    }
    return null;
  }

  public static from<T>(arr: T[]) {
    const stack = new ArrayStack<T>();
    for (let i = 0; i < arr.length; i++) {
      stack.push(arr[i]);
    }
    return stack;
  }

  public toArray(): T[] {
    return this.array.slice();
  }
}
