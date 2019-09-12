import $ from 'jquery';
import { ArrayGraph, ArrayVertex } from './ds/Graph/ArrayGraph';
import { ALGraph, ALVertex } from './ds/Graph/ALGraph';

function createArrayVertexes<T>(arr: T[]) {
  const vertexes: ArrayVertex<T>[] = [];
  for (const v of arr) {
    vertexes.push(new ArrayVertex(v));
  }
  return vertexes;
}
type Point = { left: number; top: number };

function createLine(
  ctx: CanvasRenderingContext2D,
  point1: Point,
  point2: Point
) {
  ctx.beginPath();
  ctx.moveTo(point1.left, point1.top);
  ctx.lineTo(point2.left, point2.top);
  ctx.closePath();
  ctx.stroke();
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string
) {
  ctx.beginPath();
  ctx.arc(x, y, 16, 0, 2 * Math.PI, true);
  ctx.fillStyle = '#444444';
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = '20px normal';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function drawGraph(ctx: CanvasRenderingContext2D, graph: ArrayGraph<any>) {
  const vertexesDOM: Point[] = [
    {
      left: 100,
      top: 20
    },
    {
      left: 20,
      top: 100
    },
    {
      left: 170,
      top: 100
    },
    {
      left: 20,
      top: 170
    },
    {
      left: 170,
      top: 170
    }
  ];
  for (let i = 0; i < graph.arcs.length; i++) {
    for (let j = 0; j < graph.arcs[i].length; j++) {
      if (graph.arcs[i][j] === 1) {
        createLine(ctx, vertexesDOM[i], vertexesDOM[j]);
      }
    }
  }
  for (let i = 0; i < vertexesDOM.length; i++) {
    drawCircle(
      ctx,
      vertexesDOM[i].left,
      vertexesDOM[i].top,
      graph.vertexes[i].value.toString()
    );
  }
}

function main() {
  const graph = new ALGraph([1, 2, 3, 4, 5], [
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0],
    [0, 1, 1, 0, 0]
  ]);
  graph.print();
  // graph.addVert(new ALVertex(10,null));
  // graph.addArc(graph.vertexes[5],graph.vertexes[0]);
  // graph.delArc(graph.vertexes[2],graph.vertexes[3]);
  graph.delVert(graph.vertexes[2])
  graph.print();
  // const cvs = document.getElementById('cvs') as HTMLCanvasElement;
  // const ctx = cvs.getContext('2d')!;
  // drawGraph(ctx, graph);

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
  //}
}

main();
