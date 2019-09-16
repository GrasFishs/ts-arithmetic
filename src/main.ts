import $ from 'jquery';
import { ArrayGraph } from './ds/Graph/ArrayGraph';
import { ArrayGraphDrawer } from './drawer/Graph/ArrayGraphDrawer';
import { ALGraph } from './ds/Graph/ALGraph';
import { ALGraphDrawer } from './drawer/Graph/ALGraphDrawer';

const arcs = [
  [0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

const fakeArcs = Array.from({ length: 8 }).fill(
  Array.from({ length: 8 }).fill(1)
);

function main() {
  const graph = new ALGraph([1, 2, 3, 4, 5, 6, 7, 8], arcs);
  const cvs = document.getElementById('cvs') as HTMLCanvasElement;
  const graphDrawer = new ALGraphDrawer(cvs, graph);
  graphDrawer.render();

  let visited = graph.vertexes.map(() => false);
  const visitedAll: boolean[][] = [];
  visitedAll.push(visited);

  graph.DFS(vert => {
    console.log(vert.value);
    const index = graph.vertexes.findIndex(v => v === vert);
    visited = visited.map((_, i) => (i === index ? true : _));
    visitedAll.push(visited);
  });

  for (let i = 0; i < visitedAll.length; i++) {
    setTimeout(() => {
      const visited = visitedAll[i];
      graphDrawer.drawGraph(visited);
    }, i * 300);
  }

  // const lines = $('.del-lines');
  // graph.print();
  // for (let i = 0; i < graph.arcs.length; i++) {
  //   for (let j = 0; j < graph.arcs[i].length; j++) {
  //     if (graph.arcs[i][j] === 1) {
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
