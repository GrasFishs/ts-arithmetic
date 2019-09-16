import { Graph } from './Graph';
import { ArrayQueue } from '../List/Queue/ArrayQueue';

export class ArrayVertex<V> {
  constructor(public value: V) {}
}

export class ArrayGraph<V> implements Graph<ArrayVertex<V>, V> {
  public vertexes: ArrayVertex<V>[] = [];
  public edges: number[][] = [];

  constructor(vertexes: V[], edges: number[][]) {
    this.vertexes = this.createArrayVertexes(vertexes);
    this.edges = edges;
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
    this.edges.push(Array.from({ length: this.vertexes.length - 1 }).fill(
      0
    ) as number[]);
    for (let i = 0; i < this.vertexes.length; i++) {
      this.edges[i].push(0);
    }
    return true;
  }
  addEdge(target: ArrayVertex<V>, src: ArrayVertex<V>): boolean {
    const i = this.vertexes.findIndex(vert => vert === target);
    const j = this.vertexes.findIndex(vert => vert === src);
    if (i !== -1 && j !== -1) {
      this.edges[i][j] = 1;
      return true;
    }
    return false;
  }
  delVert(target: ArrayVertex<V>): boolean {
    const index = this.vertexes.findIndex(vert => vert === target);
    if (index !== -1) {
      for (let i = 0; i < this.vertexes.length; i++) {
        this.edges[i].splice(index, 1);
      }
      this.edges.splice(index, 1);
      this.vertexes.splice(index, 1);
      return true;
    }
    return false;
  }
  delArc(target: ArrayVertex<V>, src: ArrayVertex<V>): boolean {
    const i = this.vertexes.findIndex(vert => vert === target);
    const j = this.vertexes.findIndex(vert => vert === src);
    if (i !== -1 && j !== -1 && i !== j) {
      this.edges[i][j] = 0;
      return true;
    }
    return false;
  }

  adj(vert: ArrayVertex<V>): ArrayVertex<V>[] {
    const index = this.vertexes.findIndex(v => v === vert);
    const vertexes: ArrayVertex<V>[] = [];
    this.edges[index].forEach((arc, ind) => {
      if (arc === 1) {
        vertexes.push(this.vertexes[ind]);
      }
    });
    return vertexes;
  }

  pathTo(src: ArrayVertex<V>, to: ArrayVertex<V>): ArrayVertex<V>[] {
    const vertexes: ArrayVertex<V>[] = [];
    const edgeTo = new WeakMap<ArrayVertex<V>, ArrayVertex<V> | null>();
    this.DFS(src, (vert, src) => {
      if (vert !== src) {
        edgeTo.set(vert, src);
      }
    });

    for (let v = to; v !== src; v = edgeTo.get(v)!) {
      vertexes.unshift(v);
    }
    vertexes.unshift(src);
    return vertexes;
  }

  DFS(
    from: ArrayVertex<V>,
    visitor: (v: ArrayVertex<V>, src: ArrayVertex<V>) => void
  ): void {
    const visited = new WeakMap<ArrayVertex<V>, boolean>();
    this.vertexes.forEach(vert => visited.set(vert, false));

    const traverse = (vert: ArrayVertex<V>, src: ArrayVertex<V>) => {
      if (!visited.get(vert)) {
        visitor(vert, src);
        visited.set(vert, true);
        for (const v of this.adj(vert)) {
          if (!visited.get(v)) traverse(v, vert);
        }
      }
    };
    traverse(from, from);
  }
  BFS(
    from: ArrayVertex<V>,
    visitor: (v: ArrayVertex<V>, src: ArrayVertex<V>) => void
  ): void {
    const queue = new ArrayQueue<ArrayVertex<V>>();
    const visited = new WeakMap<ArrayVertex<V>, boolean>();
    this.vertexes.forEach(vert => visited.set(vert, false));

    visitor(from, from);
    visited.set(from, true);
    queue.enqueue(from);
    while (!queue.isEmpty()) {
      const v = queue.dequeue()!;
      for (const vv of this.adj(v)) {
        if (!visited.get(vv)) {
          visitor(vv, v);
          visited.set(vv, true);
          queue.enqueue(vv);
        }
      }
    }
  }

  print() {
    let str = '';
    for (let i = 0; i < this.edges.length; i++) {
      str += '| ';
      for (let j = 0; j < this.edges[i].length; j++) {
        str += this.edges[i][j] + ' ';
      }
      str += '|\n';
    }
    console.log(str);
  }
}
