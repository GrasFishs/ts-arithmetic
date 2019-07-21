export type ComparableResult = 0 | -1 | 1;

export interface Comparable<T> {
  compareTo: (s: T) => ComparableResult;
}
