import { Drawer, Point } from '../Drawer';
import { ArrayGraph } from '../../ds/Graph/ArrayGraph';

export class ArrayGraphDrawer<V> extends Drawer {
  graph = <ArrayGraph<V>>this.graph;
  drawGraph(visitedVert: boolean[] = []) {
    const vertexesDOM: Point[] = this.getVertexPoints();
    this.clear();
    for (let i = 0; i < this.graph.arcs.length; i++) {
      for (let j = 0; j < this.graph.arcs[i].length; j++) {
        if (this.graph.arcs[i][j] === 1) {
          this.line(vertexesDOM[i], vertexesDOM[j]);
        }
      }
    }
    for (let i = 0; i < this.graph.arcs.length; i++) {
      this.drawCircle(
        vertexesDOM[i].left,
        vertexesDOM[i].top,
        visitedVert[i],
        this.graph.vertexes[i].value.toString()
      );
    }
  }

  public render(): void {
    this.drawGraph();
  }
}
