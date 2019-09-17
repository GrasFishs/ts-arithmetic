import { Hash } from '../../src/ds/Map/Hash';

describe('HashMap test:', () => {
  it('init hash', () => {
    const hash = new Hash<number, number>();
    expect(hash.size()).toEqual(0);
    expect(hash.isEmpty()).toBeTruthy();
  });

  it('set string key', () => {
    const hash = new Hash<string, number>();
    const key = '123';
    const value = 233;
    expect(hash.size()).toEqual(0);
    hash.put(key, value);
    hash.put('ccc', value);
    expect(hash.size()).toEqual(2);
    hash.put(key, value + 10);
    expect(hash.size()).toEqual(2);
    expect(hash.get(key)).toEqual(value + 10);
  });

  it('set object key', () => {
    const hash = new Hash<object, number>();
    const key = { a: '123' };
    const value = 233;
    expect(hash.size()).toEqual(0);
    hash.put(key, value);
    expect(hash.size()).toEqual(1);
    hash.put({ a: '123' }, value);
    expect(hash.size()).toEqual(2);
  });
});
