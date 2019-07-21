import { SString } from './SString';

describe('SString test', () => {
  const str = 'abcd123';
  const chars = ['a', 'b', 'c', 'd', '1', '2', '3'];
  test('SString init', () => {
    const ss = new SString(chars);
    expect(ss.toString()).toEqual(str);
    const func = () => new SString(['123']);
    expect(func).toThrow();
  });

  test('SString copy', () => {
    const ss = new SString(chars);
    let ss2 = new SString([]);
    expect(ss2.toString()).not.toEqual(ss.toString());
    ss2 = ss.copy();
    expect(ss2.toString()).toEqual(ss.toString());
  });

  test('SString empty', () => {
    const ss = new SString(chars);
    const ss2 = new SString([]);
    expect(ss.isEmpty()).toBeFalsy();
    expect(ss2.isEmpty()).toBeTruthy();
  });

  test('SString length', () => {
    const ss = new SString(chars);
    expect(ss.length).toEqual(chars.length);
  });

  test('SString clear', () => {
    const ss = new SString(chars);
    expect(ss.length).toBeGreaterThan(0);
    ss.clear();
    expect(ss.length).toEqual(0);
  });

  test('SString concat', () => {
    const ss = new SString(chars);
    const arr2 = ['4', '5'];
    const ss2 = new SString(arr2);
    const ss3 = ss.concat(ss2);
    expect(ss3.toString()).toEqual(chars.concat(arr2).join(''));
  });

  test('SString subString', () => {
    const ss = new SString(chars);
    expect(ss.subString(0, ss.length).toString()).toEqual(
      str.substr(0, ss.length)
    );
    expect(ss.subString(0, 3).toString()).toEqual(str.substr(0, 3));
    const func = () => ss.subString(-1);
    const func1 = () => ss.subString(0, ss.length + 1);
    expect(func).toThrow();
    expect(func1).toThrow();
  });

  test('SString get', () => {
    const ss = new SString(chars);
    expect(ss.get(0)).toEqual(str[0]);
    expect(ss.get(ss.length - 1)).toEqual(str[ss.length - 1]);
    const func1 = () => ss.get(-1);
    expect(func1).toThrow();
    const func = () => ss.get(ss.length);
    expect(func).toThrow();
  });

  test('SString compareTo', () => {
    const ss = new SString(['1', '2']);
    const s2 = new SString(['1', '3']);
    const s3 = new SString(['1', '1']);
    const s4 = new SString(['1', '2']);
    const s5 = new SString(['1', '2', '3']);

    expect(ss.compareTo(s2)).toBe(-1);
    expect(ss.compareTo(s3)).toBe(1);
    expect(ss.compareTo(s4)).toBe(0);
    expect(ss.compareTo(s5)).toBe(-1);
  });

  test('SString insert', () => {
    const ss = new SString(chars);
    const chars2 = chars.slice();
    chars2.splice(chars.length - 1, 0, '5');
    ss.insert(ss.length - 1, '5');
    expect(ss.toString()).toEqual(chars2.join(''));
    const ss2 = new SString(chars);
    const chars3 = chars.slice();
    chars3.splice(3, 0, 'z');
    ss2.insert(3, 'z');
    expect(ss2.toString()).toEqual(chars3.join(''));
    const func = () => ss2.insert(-1, 'z');
    expect(func).toThrow();
  });

  test('SString remove', () => {
    const ss = new SString(chars);
    const chars2 = chars.slice();
    chars2.splice(2, 1);
    const chars3 = chars.slice();
    chars3.splice(3, 2);
    const ss2 = new SString(chars);
    ss.delete(2);
    ss2.delete(3, 2);
    expect(ss.toString()).toEqual(chars2.join(''));
    expect(ss2.toString()).toEqual(chars3.join(''));
    const func = () => ss.delete(-1);
    expect(func).toThrow();
  });
});
