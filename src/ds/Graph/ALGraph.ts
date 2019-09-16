import { Graph } from './Graph';
import { ArrayQueue } from '../List/Queue/ArrayQueue';

export class ALArc<V> {
  constructor(public vertex: ALVertex<V>, public nextArc: ALArc<V> | null) {}
}

export class ALVertex<V> {
  private tail: ALArc<V> | null;
  constructor(public value: V, public arc: ALArc<V> | null) {
    this.tail = arc;
  }

  append(arc: ALArc<V>) {
    if (this.arc === null) {
      this.arc = arc;
      this.tail = this.arc;
    } else {
      this.tail!.nextArc = arc;
      this.tail = this.tail!.nextArc;
    }
  }

  delete(vert: ALVertex<V>): boolean {
    let p = this.arc;
    while (p !== null) {
      if (p.vertex === vert) {
        this.arc = p.nextArc;
      }
      if (p.nextArc !== null && p.nextArc.vertex === vert) {
        p.nextArc = p.nextArc.nextArc;
        return true;
      }
      p = p.nextArc;
    }
    return false;
  }
}

export class ALGraph<V> implements Graph<ALVertex<V>, V> {
  public vertexes: ALVertex<V>[] = [];

  constructor(nodes: V[], _edges: number[][]) {
    this.create(nodes, _edges);
  }

  create(nodes: V[], edges: number[][]) {
    this.vertexes = nodes.map(node => new ALVertex(node, null));
    for (let i = 0; i < edges.length; i++) {
      for (let j = 0; j < edges[i].length; j++) {
        if (edges[i][j] === 1) {
          this.vertexes[i].append(new ALArc(this.vertexes[j], null));
        }
      }
    }
    console.log(this.vertexes);
  }

  get(value: V): ALVertex<V> | undefined {
    return this.vertexes.find(vert => vert.value === value);
  }
  set(vert: ALVertex<V>, value: V): boolean {
    if (this.vertexes.includes(vert)) {
      const finder = this.vertexes.find(v => v === vert);
      finder!.value = value;
      return true;
    } else {
      return false;
    }
  }
  addVert(target: ALVertex<V>): boolean {
    this.vertexes.push(target);
    return true;
  }
  addEdge(target: ALVertex<V>, src: ALVertex<V>): boolean {
    const t = this.vertexes.find(vert => vert === target);
    const s = this.vertexes.find(vert => vert === src);
    if (t && s) {
      t.append(new ALArc(src, null));
    }
    return false;
  }
  delVert(target: ALVertex<V>): boolean {
    const index = this.vertexes.findIndex(vert => vert === target);
    if (index !== -1) {
      for (const vert of this.vertexes) {
        if (vert !== target) {
          vert.delete(target);
        }
      }
      this.vertexes.splice(index, 1);
      return true;
    }
    return false;
  }
  delArc(target: ALVertex<V>, src: ALVertex<V>): boolean {
    const t = this.vertexes.find(vert => vert === target);
    const s = this.vertexes.find(vert => vert === src);
    if (t && s) {
      return t.delete(s);
    }
    return false;
  }

  adj(vert: ALVertex<V>): ALVertex<V>[] {
    const vertexes: ALVertex<V>[] = [];
    for (let p = vert.arc; p != null; p = p.nextArc) {
      vertexes.push(p.vertex);
    }
    return vertexes;
  }

  DFS(
    from: ALVertex<V>,
    visitor: (v: ALVertex<V>, src: ALVertex<V>) => void
  ): void {
    const visited = new WeakMap<ALVertex<V>, boolean>();
    this.vertexes.forEach(vert => visited.set(vert, false));

    const traverse = (vert: ALVertex<V>, src: ALVertex<V>) => {
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

  pathTo(src: ALVertex<V>, to: ALVertex<V>): ALVertex<V>[] {
    const vertexes: ALVertex<V>[] = [];
    const edgeTo = new WeakMap<ALVertex<V>, ALVertex<V> | null>();
    this.DFS(src, (vert, src) => {
      if (vert !== src) {
        edgeTo.set(vert, src);
      }
    });

    for (let v = to; v !== src; v = edgeTo.get(v)!) {
      vertexes.unshift(v);
    }
    vertexes.unshift(src)
    return vertexes;
  }

  BFS(
    from: ALVertex<V>,
    visitor: (v: ALVertex<V>, src: ALVertex<V>) => void
  ): void {
    const queue = new ArrayQueue<ALVertex<V>>();
    const visited = new WeakMap<ALVertex<V>, boolean>();
    this.vertexes.forEach(vert => visited.set(vert, false));

    visited.set(from, true);
    visitor(from, from);
    queue.enqueue(from);
    while (!queue.isEmpty()) {
      const v = queue.dequeue()!;
      for (const vv of this.adj(v)) {
        if (!visited.get(vv)) {
          visited.set(vv, true);
          visitor(vv, v);
          queue.enqueue(vv);
        }
      }
    }
  }

  print() {
    let str = '';
    for (const vert of this.vertexes) {
      str += `[${vert.value}]`;
      for (const v of this.adj(vert)) {
        str += ` -> ${v.value}`;
      }
      str += '\n';
    }
    console.log(str);
  }
}
