import { Drawer, Point } from '../Drawer';
import { ArrayGraph } from '../../ds/Graph/ArrayGraph';

export class ArrayGraphDrawer<V> extends Drawer {
  graph = <ArrayGraph<V>>this.graph;
  drawGraph(visitedVert: boolean[] = [], visitedEdge: number[] = []) {
    const vertexesDOM: Point[] = this.getVertexPoints();
    this.clear();
    for (let i = 0; i < this.graph.edges.length; i++) {
      for (let j = 0; j < this.graph.edges[i].length; j++) {
        if (this.graph.edges[i][j] === 1) {
          this.line(
            vertexesDOM[i],
            vertexesDOM[j],
            (i === visitedEdge[0] && j === visitedEdge[1]) ||
              (j === visitedEdge[0] && i === visitedEdge[1])
          );
        }
      }
    }
    for (let i = 0; i < this.graph.edges.length; i++) {
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
