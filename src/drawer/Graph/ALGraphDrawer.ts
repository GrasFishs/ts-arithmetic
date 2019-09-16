import { Drawer, Point } from '../Drawer';
import { ALGraph, ALVertex } from '../../ds/Graph/ALGraph';

export class ALGraphDrawer<V> extends Drawer {
  graph = <ALGraph<V>>this.graph;

  private getPoint(vertex: ALVertex<V>): Point {
    const index = this.graph.vertexes.findIndex(vert => vertex === vert);
    return this.getVertexPoints()[index];
  }

  public drawGraph(visitedVert: boolean[] = []): void {
    const points = this.getVertexPoints();
    for (let i = 0; i < this.graph.vertexes.length; i++) {
      const vert = this.graph.vertexes[i];
      for (let p = vert.arc; p !== null; p = p.nextArc) {
        const nextPoint = this.getPoint(p.vertex);
        this.line(points[i], nextPoint);
      }
    }

    for (let i = 0; i < this.graph.vertexes.length; i++) {
      this.drawCircle(
        points[i].left,
        points[i].top,
        visitedVert[i],
        this.graph.vertexes[i].value.toString()
      );
    }
  }

  public render(): void {
    this.drawGraph();
  }
}
