import { LinkedQueue } from '../../src/ds/List/Queue/LinkedQueue';

describe('LinkedQueue test', () => {
  const arr = [1, 2, 3, 4, 5];
  test('init queue', () => {
    const queue = new LinkedQueue<number>();
    expect(queue.isEmpty()).toBeTruthy();
    expect(queue.top()).toBeNull();
  });

  test('init queue from arry', () => {
    const queue = LinkedQueue.from(arr);
    expect(queue.length).toEqual(arr.length);
    expect(queue.toArray()).toEqual(arr);
  });

  test('enqueue value', () => {
    const queue = LinkedQueue.from(arr);
    const value = 6;
    const innerArry = arr.slice();
    queue.enqueue(value);
    innerArry.push(value);
    expect(queue.length).toEqual(innerArry.length);
    expect(queue.toArray()).toEqual(innerArry);
  });

  test('dequeue value in an empty queue', () => {
    const queue = new LinkedQueue<number>();
    const result = queue.dequeue();
    expect(result).toBeNull();
  });

  test('dequeue value', () => {
    const queue = LinkedQueue.from(arr);
    const innerArry = arr.slice();
    const result1 = queue.dequeue();
    const result2 = innerArry.shift();
    expect(queue.length).toEqual(innerArry.length);
    expect(result1).toEqual(result2);
    expect(queue.toArray()).toEqual(innerArry);
  });
});
