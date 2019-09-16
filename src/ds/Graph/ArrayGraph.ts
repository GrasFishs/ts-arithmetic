import { Graph } from './Graph';
import { ArrayQueue } from '../List/Queue/ArrayQueue';

export class ArrayVertex<V> {
  constructor(public value: V) {}
}

export class ArrayGraph<V> implements Graph<ArrayVertex<V>, V> {
  public vertexes: ArrayVertex<V>[] = [];
  public arcs: number[][] = [];

  constructor(vertexes: V[], arcs: number[][]) {
    this.vertexes = this.createArrayVertexes(vertexes);
    this.arcs = arcs;
  }

  createArrayVertexes<V>(arr: V[]) {
    const vertexes: ArrayVertex<V>[] = [];
    for (const v of arr) {
      vertexes.push(new ArrayVertex(v));
    }
    return vertexes;
  }

  get(value: V): ArrayVertex<V> | undefined {
    return this.vertexes.find(vert => vert.value === value);
  }
  set(target: ArrayVertex<V>, value: V): boolean {
    if (this.vertexes.includes(target)) {
      target.value = value;
      return true;
    }
    return false;
  }
  addVert(vert: ArrayVertex<V>): boolean {
    this.vertexes.push(vert);
    this.arcs.push(Array.from({ length: this.vertexes.length - 1 }).fill(
      0
    ) as number[]);
    for (let i = 0; i < this.vertexes.length; i++) {
      this.arcs[i].push(0);
    }
    return true;
  }
  addArc(target: ArrayVertex<V>, src: ArrayVertex<V>): boolean {
    const i = this.vertexes.findIndex(vert => vert === target);
    const j = this.vertexes.findIndex(vert => vert === src);
    if (i !== -1 && j !== -1) {
      this.arcs[i][j] = 1;
      return true;
    }
    return false;
  }
  delVert(target: ArrayVertex<V>): boolean {
    const index = this.vertexes.findIndex(vert => vert === target);
    if (index !== -1) {
      for (let i = 0; i < this.vertexes.length; i++) {
        this.arcs[i].splice(index, 1);
      }
      this.arcs.splice(index, 1);
      this.vertexes.splice(index, 1);
      return true;
    }
    return false;
  }
  delArc(target: ArrayVertex<V>, src: ArrayVertex<V>): boolean {
    const i = this.vertexes.findIndex(vert => vert === target);
    const j = this.vertexes.findIndex(vert => vert === src);
    if (i !== -1 && j !== -1 && i !== j) {
      this.arcs[i][j] = 0;
      return true;
    }
    return false;
  }
  DFS(visitor: (v: ArrayVertex<V>) => void): void {
    const visited = this.vertexes.map(() => false);

    const traverse = (vertIndex: number) => {
      visitor(this.vertexes[vertIndex]);
      visited[vertIndex] = true;
      for (let j = 0; j < this.arcs[vertIndex].length; j++) {
        const arc = this.arcs[vertIndex][j];
        if (arc === 1 && !visited[j]) {
          traverse(j);
        }
      }
    };
    for (let i = 0; i < this.vertexes.length; i++) {
      if (!visited[i]) traverse(i);
    }
  }
  BFS(visitor: (v: ArrayVertex<V>) => void): void {
    const queue = new ArrayQueue<ArrayVertex<V>>();
    const visited = this.vertexes.map(() => false);
    for (let i = 0; i < this.vertexes.length; i++) {
      if (!visited[i]) {
        const vert = this.vertexes[i];
        visitor(vert);
        visited[i] = true;
        queue.enqueue(vert);
        while (!queue.isEmpty()) {
          const vert = queue.dequeue()!;
          const index = this.vertexes.findIndex(v => v === vert);
          for (let j = 0; j < this.arcs[index].length; j++) {
            if (this.arcs[index][j] === 1 && !visited[j]) {
              const v = this.vertexes[j];
              visitor(v);
              visited[j] = true;
              queue.enqueue(v);
            }
          }
        }
      }
    }
  }

  print() {
    let str = '';
    for (let i = 0; i < this.arcs.length; i++) {
      str += '| ';
      for (let j = 0; j < this.arcs[i].length; j++) {
        str += this.arcs[i][j] + ' ';
      }
      str += '|\n';
    }
    console.log(str);
  }
}
