import { LinearList } from './LinearList';
import { NNode as LinkedNode } from '../util/index'
import { Around } from '../../../util/Aspect/Aspect';
import { Timer } from '../../../util/Aspect/Timer';

const timer = new Timer();

export class LinkedList<T> extends LinearList<T> {
  private head = new LinkedNode<T>(null);
  private tail = this.head;

  constructor(value?: T) {
    super();
    if (value) {
      this.append(value);
    }
  }

  @Around({ obj: timer, method: 'start' }, { obj: timer, method: 'end' })
  public get(index: number): T | null {
    if (index >= 0 && index < this._length - 1) {
      let i = 0,
        p = this.head.next;
      while (p) {
        if (i === index) {
          return p.value;
        }
        i++;
        p = p.next;
      }
      return null;
    } else if (index === this._length - 1) {
      return this.tail.value;
    } else {
      return null;
    }
  }

  public set(index: number, value: T): boolean {
    if (index >= 0 && index < this._length) {
      this.getNode(index)!.value = value;
      return true;
    } else {
      return false;
    }
  }

  public remove(index: number): boolean {
    if (index >= 0 && index < this._length - 1) {
      const indexPre = this.getNode(index - 1)!;
      indexPre.next = indexPre.next!.next;
      this._length--;
      return true;
    } else if (index === this._length - 1) {
      const beforelast = this.getNode(index - 1)!;
      this.tail = beforelast;
      this.tail.next = null;
      this._length--;
      return true;
    }
    return false;
  }

  public get top() {
    return this.head;
  }

  public indexOf(value: T): number {
    let i = 0,
      p = this.head.next;
    while (p) {
      if (p.value === value) {
        return i;
      }
      i++;
      p = p.next;
    }
    return -1;
  }

  private getNode(index: number): LinkedNode<T> | null {
    if (index >= 0 && index < this._length - 1) {
      let i = 0,
        p = this.head.next;
      while (p) {
        if (i === index) {
          return p;
        }
        i++;
        p = p.next;
      }
      return null;
    } else if (index === this._length - 1) {
      return this.tail;
    } else {
      return null;
    }
  }

  public insertBefore(value: T, index: number): boolean {
    if (index > 0 && index < this._length - 1) {
      const beforePre = this.getNode(index - 1)!;
      const node = new LinkedNode(value);
      node.next = beforePre.next;
      beforePre.next = node;
      this._length++;
      return true;
    } else if (index === 0 && this._length > 0) {
      const node = new LinkedNode(value);
      node.next = this.head.next;
      this.head.next = node;
      this._length++;
      return true;
    }
    return false;
  }

  public insertAfter(value: T, index: number): boolean {
    if (index >= 0 && index < this._length - 1) {
      const after = this.getNode(index)!;
      const node = new LinkedNode(value);
      node.next = after.next;
      after.next = node;
      this._length++;
      return true;
    } else if (index === this._length - 1) {
      this.append(value);
      return true;
    }
    return false;
  }

  public append(value: T) {
    const node = new LinkedNode(value);
    this.tail.next = node;
    this.tail = this.tail.next;
    this._length++;
  }

  public clear() {
    this.head.next = null;
    this.tail = this.head;
    this._length = 0;
  }

  public static from<T>(arr: Array<T>) {
    const list = new LinkedList<T>();
    for (let i = 0; i < arr.length; i++) {
      list.append(arr[i]);
    }
    return list;
  }

  public toArray() {
    const arr = [];
    for (let p = this.head.next!; p; p = p.next!) {
      arr.push(p.value);
    }
    return arr;
  }
}
