export interface Graph<Vert = any, Value = any> {
  get: (value: Value) => Vert | undefined;
  set: (vert: Vert, value: Value) => boolean;
  addVert: (target: Vert) => boolean;
  addArc: (target: Vert, src: Vert) => boolean;
  delVert: (target: Vert) => boolean;
  delArc: (target: Vert, src: Vert) => boolean;
  DFS: (visitor: (v: Vert) => void) => void;
  BFS: (visitor: (v: Vert) => void) => void;
}
