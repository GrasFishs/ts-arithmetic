import { List } from "../List";

export abstract class Stack<T> extends List{

  abstract push(value: T): void;

  abstract pop(): T | null;

  abstract top(): T | null;
}
