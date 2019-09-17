export interface MMap<K, V> {
  get: (key: K) => V | null;
  put: (key: K, value: V) => void;
  contains: (key: K) => boolean;
  containsValue: (value: V) => boolean;
  delete: (key: K) => boolean;
  clear: () => void;
  isEmpty: () => boolean;
  keys: () => K[];
  values: () => V[];
  size: () => number;
  entries: () => (K | V)[][];
}
