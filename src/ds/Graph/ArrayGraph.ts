import { Graph } from './Graph';

export class ArrayVertex<V> {
  constructor(public value: V) {}
}

export class ArrayGraph<V> implements Graph<ArrayVertex<V>, V> {
  public vertexes: ArrayVertex<V>[] = [];
  public arcs: number[][] = [];

  constructor(vertexes: ArrayVertex<V>[], arcs: number[][]) {
    this.vertexes = vertexes;
    this.arcs = arcs;
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
  DFS(visitor: (v: ArrayVertex<V>) => void): void {}
  BFS(visitor: (v: ArrayVertex<V>) => void): void {}

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
