import { LinearList } from './LinearList';
import { Before, After, Around } from '../../../util/Aspect/Aspect';
import { Timer } from '../../../util/Aspect/Timer';

const timer = new Timer();

export class ArrayList<T> extends LinearList<T> {
  private array: T[];

  constructor() {
    super();
    this.array = [];
  }

  @Around({ obj: timer, method: 'start' }, { obj: timer, method: 'end' })
  public get(index: number): T | null {
    if (index >= 0 && index < this._length) {
      return this.array[index];
    }
    return null;
  }

  public set(index: number, value: T): boolean {
    if (index >= 0 && index < this._length) {
      this.array[index] = value;
    }
    return false;
  }

  public remove(index: number): boolean {
    if (index >= 0 && index < this._length) {
      this.array.splice(index, 1);
      this._length--;
      return true;
    } else {
      return false;
    }
  }

  public clear(): void {
    this.array = [];
    this._length = 0;
  }

  public indexOf(value: T): number {
    return this.array.indexOf(value);
  }

  public insertBefore(value: T, index: number): boolean {
    if (index >= 0 && index < this._length) {
      this.array.splice(index, 0, value);
      this._length++;
      return true;
    } else {
      return false;
    }
  }

  public insertAfter(value: T, index: number): boolean {
    if (index >= 0 && index < this._length) {
      this.array.splice(index + 1, 0, value);
      this._length++;
      return true;
    } else {
      return false;
    }
  }

  public append(value: T): void {
    this.array.push(value);
    this._length++;
  }

  public static from<T>(arr: T[]): ArrayList<T> {
    const list = new ArrayList<T>();
    for (let i = 0; i < arr.length; i++) {
      list.append(arr[i]);
    }
    return list;
  }

  public toArray() {
    return this.array.slice();
  }
}
