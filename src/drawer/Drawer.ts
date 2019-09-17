import { Graph } from '../ds/Graph/Graph';

export abstract class Drawer {
  protected ctx: CanvasRenderingContext2D;
  constructor(
    protected canvas: HTMLCanvasElement,
    protected graph: Graph,
    private isDirected: boolean = false
  ) {
    this.ctx = canvas.getContext('2d')!;
  }

  protected clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  protected line(point1: Point, point2: Point, isVisited: boolean = false) {
    this.ctx.beginPath();
    this.ctx.fillStyle = isVisited ? '#c62828' : '#444444';
    this.ctx.moveTo(point1.left, point1.top);
    this.ctx.lineTo(point2.left, point2.top);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  protected drawCircle(x: number, y: number, isVisited: boolean, text: string) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 16, 0, 2 * Math.PI, true);
    this.ctx.fillStyle = isVisited ? '#c62828' : '#444444';
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textAlign = 'center';
    this.ctx.font = '20px normal';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, y);
  }

  getVertexPoints() {
    return [
      {
        left: this.canvas.width / 2,
        top: 20
      },
      {
        left: this.canvas.width / 4,
        top: 60
      },
      {
        left: (this.canvas.width * 3) / 4,
        top: 60
      },
      {
        left: this.canvas.width / 8,
        top: 120
      },
      {
        left: (this.canvas.width * 3) / 8,
        top: 120
      },
      {
        left: (this.canvas.width * 5) / 8,
        top: 120
      },
      {
        left: (this.canvas.width * 7) / 8,
        top: 120
      },
      {
        left: this.canvas.width / 16,
        top: 180
      },
      {
        left: (this.canvas.width * 3) / 16,
        top: 180
      },
      {
        left: (this.canvas.width * 5) / 16,
        top: 180
      },
      {
        left: (this.canvas.width * 7) / 16,
        top: 180
      },
      {
        left: (this.canvas.width * 9) / 16,
        top: 180
      },
      {
        left: (this.canvas.width * 11) / 16,
        top: 180
      },
      {
        left: (this.canvas.width * 13) / 16,
        top: 180
      },
      {
        left: (this.canvas.width * 15) / 16,
        top: 180
      }
    ];
  }

  public abstract drawGraph(
    visitedVert: boolean[],
    visitedEdge: number[]
  ): void;

  public abstract render(): void;
}

export type Point = { left: number; top: number };
