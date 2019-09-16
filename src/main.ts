import $ from 'jquery';
import { ArrayGraph, ArrayVertex } from './ds/Graph/ArrayGraph';
import { ArrayGraphDrawer } from './drawer/Graph/ArrayGraphDrawer';
import { ALGraph } from './ds/Graph/ALGraph';
import { ALGraphDrawer } from './drawer/Graph/ALGraphDrawer';

const edges = [
  [0, 1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 1, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0]
];

const fakeEdges = Array.from({ length: 8 }).fill(
  Array.from({ length: 8 }).fill(1)
) as number[][];

function main() {
  const graph = new ArrayGraph([1, 2, 3, 4, 5, 6, 7, 8], edges);
  const cvs = document.getElementById('cvs') as HTMLCanvasElement;
  const graphDrawer = new ArrayGraphDrawer(cvs, graph);
  // graph.addVert(new ArrayVertex(9));
  graphDrawer.render();

  let visited = graph.vertexes.map(() => false);
  const visitedAll: boolean[][] = [];
  visitedAll.push(visited);

  graph.DFS(graph.vertexes[2], vert => {
    console.log(vert.value);
    const index = graph.vertexes.findIndex(v => v === vert);
    visited = visited.map((_, i) => (i === index ? true : _));
    visitedAll.push(visited);
  });

  for (const vert of graph.vertexes) {
    const path = graph.pathTo(graph.vertexes[2], vert);
    console.log(path.map(v => v.value).join('->'));
  }

  for (let i = 0; i < visitedAll.length; i++) {
    setTimeout(() => {
      const visited = visitedAll[i];
      graphDrawer.drawGraph(visited);
    }, i * 200);
  }

  // const lines = $('.del-lines');
  // graph.print();
  // for (let i = 0; i < graph.edges.length; i++) {
  //   for (let j = 0; j < graph.edges[i].length; j++) {
  //     if (graph.edges[i][j] === 1) {
  //       const target = graph.vertexes[i];
  //       const src = graph.vertexes[j];
  //       const line = $('<div class="del-line"></div>');
  //       line.html(`${target.value}=>${src.value}`);
  //       line.on('click', () => {
  //         graph.delArc(target, src);
  //         ctx.clearRect(0, 0, cvs.width, cvs.height);
  //         graph.print();
  //         drawGraph(ctx, graph);
  //       });
  //       lines.append(line);
  //     }
  //   }
  // }
}

main();
