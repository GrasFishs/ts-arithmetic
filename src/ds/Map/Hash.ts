import { MMap } from './Map';
import { LinkedList } from '../List/Linear/LinkedList';

const PRIME_TABLE = [
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97
];
class Node<K, V> {
  constructor(
    public key: K,
    public value: V,
    public index: number,
    public next: Node<K, V> | null
  ) {}
}

export class Hash<K, V> implements MMap<K, V> {
  clear(): void {
    this.table = [];
  }
  isEmpty(): boolean {
    return this.table.length === 0;
  }
  keys(): K[] {
    const set: K[] = [];
    this.table.forEach(head => {
      for (let p = head.top.next; p != null; p = p.next) {
        set.push(p.value!.key);
      }
    });
    return set;
  }
  values(): V[] {
    const set: V[] = [];
    this.table.forEach(head => {
      for (let p = head.top.next; p != null; p = p.next) {
        set.push(p.value!.value);
      }
    });
    return set;
  }
  size(): number {
    let size = 0;
    this.table.forEach(head => {
      for (let p = head.top.next; p != null; p = p.next) size++;
    });
    return size;
  }
  private table: LinkedList<Node<K, V>>[] = [];

  private mod = PRIME_TABLE[Math.floor(Math.random() * PRIME_TABLE.length)];

  private getter(key: K): { node: Node<K, V>; index: number } | null {
    const index = this.getIndex(key);
    const list = this.table[index];
    if (list) {
      for (let p = list.top.next, i = 0; p !== null; p = p.next, i++) {
        if (p.value!.key === key) {
          return { node: p.value!, index: i };
        }
      }
      return null;
    }
    return null;
  }

  private hashCode(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % this.mod;
    }
    return hash;
  }

  private getIndex(key: K): number {
    switch (typeof key) {
      case 'number':
        return key % this.mod;
      case 'string':
        return this.hashCode(key);
      case 'object':
      case 'boolean':
        return this.hashCode(JSON.stringify(key));
      case 'function':
        return this.hashCode(key.toString());
      default:
        return 0;
    }
  }

  get(key: K): V | null {
    const finder = this.getter(key);
    return finder ? finder.node.value : null;
  }

  put(key: K, value: V): void {
    const index = this.getIndex(key);
    const node = new Node(key, value, index, null);
    if (this.table[index]) {
      const findNode = this.getter(key);
      if (findNode) {
        findNode.node.value = value;
      } else {
        this.table[index].append(node);
      }
    } else {
      this.table[index] = new LinkedList(node);
    }
  }

  contains(key: K): boolean {
    return this.getter(key) !== null;
  }

  containsValue(value: V): boolean {
    for (let head of this.table) {
      if (head) {
        for (let p = head.top.next; p != null; p = p.next) {
          if (value === p.value!.value) {
            return true;
          }
        }
      }
    }
    return false;
  }

  delete(key: K): boolean {
    const getter = this.getter(key);
    if (getter) {
      this.table[getter.node.index].remove(getter.index);
      return true;
    }
    return false;
  }

  entries(): (K | V)[][] {
    const set: (K | V)[][] = [];
    this.table.forEach(head => {
      for (let p = head.top.next; p != null; p = p.next) {
        set.push([p.value!.key, p.value!.value]);
      }
    });
    return set;
  }
}
