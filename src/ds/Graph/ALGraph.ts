import { Graph } from './Graph';

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

  constructor(nodes: V[], _arcs: number[][]) {
    this.create(nodes, _arcs);
  }

  create(nodes: V[], arcs: number[][]) {
    this.vertexes = nodes.map(node => new ALVertex(node, null));
    for (let i = 0; i < arcs.length; i++) {
      for (let j = 0; j < arcs[i].length; j++) {
        if (arcs[i][j] === 1) {
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
  addArc(target: ALVertex<V>, src: ALVertex<V>): boolean {
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
  DFS(visitor: (v: ALVertex<V>) => void): void {}
  BFS(visitor: (v: ALVertex<V>) => void): void {}

  print() {
    let str = '';
    for (let i = 0; i < this.vertexes.length; i++) {
      const vert = this.vertexes[i];
      str += `[${vert.value}]`;
      let p = vert.arc;
      while (p !== null) {
        str += ` -> ${p.vertex.value}`;
        p = p.nextArc;
      }
      str += '\n';
    }
    console.log(str);
  }
}
