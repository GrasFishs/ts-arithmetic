import { Comparable, ComparableResult } from '../interfaces/Comparable';

export class SString implements Comparable<SString> {
  private _chars: string[] = [];

  constructor(chars: string[]) {
    this.init(chars);
  }

  public get chars(): string[] {
    return this._chars.slice();
  }

  public toString(): string {
    let s = '';
    for (const c of this._chars) {
      s += c;
    }
    return s;
  }

  public init(chars: string[]): string {
    let s = '';
    if (chars.every(char => char.length === 1)) {
      this._chars = chars.slice();
      chars.forEach(char => (s += char));
    } else {
      throw new Error('字符数组项必须是单字符的');
    }
    return s;
  }

  public copy(): SString {
    let ss = [];
    for (const c of this._chars) {
      ss.push(c);
    }
    return new SString(ss);
  }

  public isEmpty(): boolean {
    return this._chars.length === 0;
  }

  public get length(): number {
    return this._chars.length;
  }

  public clear(): void {
    this._chars = [];
  }

  public concat(s2: SString): SString {
    const str = [];
    for (const s of this._chars) {
      str.push(s);
    }
    for (const s of s2.chars) {
      str.push(s);
    }
    return new SString(str);
  }

  public get(index: number): string {
    if (index >= 0 && index < this.length) {
      return this._chars[index];
    } else {
      throw new RangeError('越界');
    }
  }

  public subString(start: number, length: number = 1): SString {
    if (
      start >= 0 &&
      start < this.length &&
      length >= 0 &&
      length < this.length - start + 1
    ) {
      return new SString(this._chars.slice(start, start + length));
    } else {
      throw new RangeError('越界');
    }
  }

  public compareTo(s: SString): ComparableResult {
    let result: ComparableResult = -1;
    if (this.length > s.length) {
      result = 1;
    } else if (this.length < s.length) {
      result = -1;
    } else {
      for (let i = 0; i < this.length; i++) {
        const s1 = this.get(i);
        const s2 = s.get(i);
        if (s1 > s2) {
          result = 1;
        } else if (s1 === s2) {
          result = 0;
        } else {
          result = -1;
        }
      }
    }
    return result;
  }

  public insert(pos: number, char: string) {
    if (char.length === 1 && pos >= 0 && pos < this.length) {
      this._chars.splice(pos, 0, char);
    } else {
      throw new RangeError('越界');
    }
  }

  public delete(start: number, length: number = 1) {
    if (
      start >= 0 &&
      start < this.length &&
      length >= 0 &&
      length < this.length - start + 1
    ) {
      this._chars.splice(start, length);
    } else {
      throw new RangeError('越界');
    }
  }
}
