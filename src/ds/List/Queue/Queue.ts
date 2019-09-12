import { List } from "../List";

export abstract class Queue<T> extends List{
  abstract enqueue(value: T): void;

  abstract dequeue(): T | null;

  abstract top(): T | null;
}
