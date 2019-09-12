import { Stack } from './Stack';
import { NNode as StackNode } from '../util/index';

export class LinkedStack<T> extends Stack<T> {
  private _top = new StackNode<T>(null);
  private bottom = this._top;

  push(value: T): void {
    const node = new StackNode<T>(value);
    node.next = this._top.next;
    this._top.next = node;
    this._length++;
  }
  pop(): T | null {
    if (!this.isEmpty()) {
      const node = this._top.next!;
      this._top.next = node.next;
      this._length--;
      return node.value;
    }
    return null;
  }

  top(): T | null {
    return this._top.next ? this._top.next.value : null;
  }

  static from<T>(arr: T[]) {
    const stack = new LinkedStack<T>();
    for (let i = 0; i < arr.length; i++) {
      stack.push(arr[i]);
    }
    return stack;
  }

  toArray(): T[] {
    const arr: T[] = [];
    let p = this._top.next;
    while (p) {
      arr.unshift(p.value!);
      p = p.next;
    }
    return arr;
  }
}
