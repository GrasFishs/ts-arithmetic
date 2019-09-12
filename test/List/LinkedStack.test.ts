import { LinkedStack } from "../../src/ds/List/Stack/LinkedStack";


describe('LinkedStack test', () => {
  const arr = [1, 2, 3, 4, 5];
  test('init empty linkedStack', () => {
    const stack = new LinkedStack<number>();
    expect(stack.length).toEqual(0);
    expect(stack.toArray()).toEqual([]);
  });

  test('init linkedStack with arr', () => {
    const stack = LinkedStack.from(arr);
    expect(stack.length).toEqual(arr.length);
    expect(stack.toArray()).toEqual(arr);
  });

  test('push to an empty stack', () => {
    const stack = new LinkedStack<number>();
    const value = 100;
    stack.push(value);
    expect(stack.length).toEqual(1);
    expect(stack.top()).toEqual(value);
  });

  test('push to an stack', () => {
    const stack = LinkedStack.from(arr);
    const value = 100;
    const innerArr = arr.slice();
    stack.push(value);
    innerArr.push(value);
    expect(stack.length).toEqual(arr.length + 1);
    expect(stack.top()).toEqual(value);
    expect(stack.toArray()).toEqual(innerArr);
  });

  test('pop from an empty stack', () => {
    const stack = new LinkedStack<number>();
    const result = stack.pop();
    expect(result).toBeNull();
  });

  test('pop value', () => {
    const stack = LinkedStack.from(arr);
    const innerArr = arr.slice();
    const result1 = stack.pop();
    const result2 = innerArr.pop();

    expect(stack.length).toEqual(arr.length - 1);
    expect(result1).toEqual(result2);
    expect(stack.toArray()).toEqual(innerArr);
  });
});
