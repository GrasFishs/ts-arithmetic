import { Queue } from '../Queue';
import { NNode as QueueNode } from '../../util';

export class LinkedQueue<T> extends Queue<T> {
  private front: QueueNode<T> = new QueueNode<T>(null);
  private rear: QueueNode<T> = this.front;

  enqueue(value: T): void {
    const node = new QueueNode(value);
    this.rear.next = node;
    this.rear = node;
    this._length++;
  }
  dequeue(): T | null {
    if (!this.isEmpty()) {
      const node = this.front.next!;
      this.front.next = node!.next;
      this._length--;
      return node.value;
    }
    return null;
  }
  top(): T | null {
    if (!this.isEmpty()) {
      return this.front.next!.value;
    }
    return null;
  }

  public static from<T>(arr: T[]): LinkedQueue<T> {
    const queue = new LinkedQueue<T>();
    for (let i = 0; i < arr.length; i++) {
      queue.enqueue(arr[i]);
    }
    return queue;
  }

  toArray(): T[] {
    const a: T[] = [];
    let pfront = this.front.next;
    while (pfront) {
      if (pfront === this.rear) {
        a.push(pfront.value!);
        break;
      }
      a.push(pfront.value!);
      pfront = pfront.next;
    }
    return a;
  }
}
