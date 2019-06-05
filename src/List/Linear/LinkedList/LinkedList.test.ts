import { LinkedList } from './LinkedList';

describe('LinkedList test:', () => {
  const arr = [1, 2, 3, 4, 5];
  test('init linkedList when arg is empty.', () => {
    let list = new LinkedList<number>();
    expect(list.length).toEqual(0);
    expect(list.toArray()).toEqual([]);
  });

  test('init linkedList when arg is number 1.', () => {
    let list = new LinkedList<number>(1);
    expect(list.length).toEqual(1);
    expect(list.get(0)).toEqual(1);
  });

  test('init linkedList from array', () => {
    let list = LinkedList.from(arr);
    expect(list.length).toEqual(arr.length);
    expect(list.toArray()).toEqual(arr);
  });

  test('append in empty list', () => {
    let list = new LinkedList<number>();
    list.append(23);
    expect(list.length).toEqual(1);
    expect(list.get(0)).toEqual(23);
  });

  test('append in a list', () => {
    let list = LinkedList.from(arr);
    list.append(23);
    expect(list.length).toEqual(arr.length + 1);
    expect(list.get(arr.length)).toEqual(23);
  });

  test('get value', () => {
    const cursor = 2;
    let list = LinkedList.from(arr);
    expect(list.get(cursor)).toEqual(arr[cursor]);
  });

  test('get value with a index out of range', () => {
    const cursor = arr.length;
    let list = LinkedList.from(arr);
    expect(list.get(cursor)).toBeNull();
  });

  test('find index', () => {
    const cursor = 2;
    let list = LinkedList.from(arr);
    expect(list.indexOf(arr[cursor])).toEqual(cursor);
  });

  test('find index fail', () => {
    const cursor = arr.length;
    let list = LinkedList.from(arr);
    expect(list.indexOf(arr[cursor])).toEqual(-1);
  });

  test('insert before', () => {
    const innerArr = arr.slice();
    const [value, beforeCursror] = [10, 2];
    let list = LinkedList.from(innerArr);
    const result = list.insertBefore(value, beforeCursror);
    innerArr.splice(beforeCursror, 0, value);
    expect(result).toBeTruthy();
    expect(list.length).toEqual(innerArr.length);
    expect(list.toArray()).toEqual(innerArr);
  });

  test('insert before with index out of range ', () => {
    const innerArr = arr.slice();
    const [value, beforeCursror] = [10, arr.length];
    let list = LinkedList.from(innerArr);
    const result = list.insertBefore(value, beforeCursror);
    expect(result).toBeFalsy();
  });

  test('insert before 0', () => {
    const innerArr = arr.slice();
    const [value, beforeCursror] = [10, 0];
    let list = LinkedList.from(innerArr);
    const result = list.insertBefore(value, beforeCursror);
    innerArr.splice(beforeCursror, 0, value);
    expect(list.length).toEqual(innerArr.length);
    expect(list.toArray()).toEqual(innerArr);
    expect(result).toBeTruthy();
  });

  test('insert before 0 when list empty', () => {
    const [value, beforeCursror] = [10, 0];
    let list = new LinkedList<number>();
    const result = list.insertBefore(value, beforeCursror);
    expect(result).toBeFalsy();
  });

  test('insert after index in range', () => {
    const innerArr = arr.slice();
    const [value, afterCursor] = [10, 3];
    let list = LinkedList.from(innerArr);
    const result = list.insertAfter(value, afterCursor);
    innerArr.splice(afterCursor + 1, 0, value);
    expect(result).toBeTruthy();
    expect(list.length).toEqual(innerArr.length);
    expect(list.toArray()).toEqual(innerArr);
  });

  test('insert after last', () => {
    const innerArr = arr.slice();
    const [value, afterCursor] = [10, arr.length - 1];
    let list = LinkedList.from(innerArr);
    const result = list.insertAfter(value, afterCursor);
    innerArr.splice(afterCursor + 1, 0, value);
    expect(result).toBeTruthy();
    expect(list.length).toEqual(innerArr.length);
    expect(list.toArray()).toEqual(innerArr);
  });

  test('insert after with index out of range', () => {
    const innerArr = arr.slice();
    const [value, afterCursor] = [10, arr.length];
    let list = LinkedList.from(innerArr);
    const result = list.insertAfter(value, afterCursor);
    expect(result).toBeFalsy();
  });

  test('remove in range', () => {
    const innerArr = arr.slice();
    const removeCursor = 3;
    let list = LinkedList.from(innerArr);
    const result = list.remove(removeCursor);
    innerArr.splice(removeCursor, 1);
    expect(result).toBeTruthy();
    expect(list.length).toEqual(innerArr.length);
    expect(list.toArray()).toEqual(innerArr);
  });

  test('remove last', () => {
    const innerArr = arr.slice();
    const removeCursor = arr.length - 1;
    let list = LinkedList.from(innerArr);
    const result = list.remove(removeCursor);
    innerArr.splice(removeCursor, 1);
    expect(result).toBeTruthy();
    expect(list.length).toEqual(innerArr.length);
    expect(list.toArray()).toEqual(innerArr);
  });

  test('remove with index out of range', () => {
    const innerArr = arr.slice();
    const removeCursor = arr.length;
    let list = LinkedList.from(innerArr);
    const result = list.remove(removeCursor);
    expect(result).toBeFalsy();
  });

  test('clear list', () => {
    let list = LinkedList.from(arr);
    list.clear();
    expect(list.length).toEqual(0);
    expect(list.toArray()).toEqual([]);
  });
});
