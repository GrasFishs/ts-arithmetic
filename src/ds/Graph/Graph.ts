export interface Graph<Vert = any, Value = any> {
  get: (value: Value) => Vert | undefined;
  set: (vert: Vert, value: Value) => boolean;
  adj: (vert: Vert) => Vert[];
  addVert: (target: Vert) => boolean;
  addEdge: (target: Vert, src: Vert) => boolean;
  delVert: (target: Vert) => boolean;
  delArc: (target: Vert, src: Vert) => boolean;
  DFS: (from: Vert, visitor: (v: Vert, src?: Vert) => void) => void;
  BFS: (from: Vert, visitor: (v: Vert, src?: Vert) => void) => void;
  pathTo: (src: Vert, to: Vert) => Vert[];
}
