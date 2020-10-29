export default class Ray implements IRay {
  vec: IVector;
  length: number = 600;

  constructor(vec: IVector) {
    this.vec = vec;
  }

  normalizeDir() {
    const l: number = Math.sqrt(Math.pow(this.vec.dir.x, 2) + Math.pow(this.vec.dir.y, 2));
    if (l > 0) {
      this.vec.dir.x = this.vec.dir.x / l;
      this.vec.dir.y = this.vec.dir.y / l;
    } else {
      this.vec.dir = { x: 0, y: 0 };
    }
  }

  lookAt(point: IPoint | undefined) {
    if (point != undefined) {
      this.vec.dir.x = point.x - this.vec.pos.x;
      this.vec.dir.y = point.y - this.vec.pos.y;
      this.normalizeDir();
    }
  }

  cast(wall: IWall): IPoint | undefined {
    // based on
    // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    const x1: number = wall.a.x;
    const y1: number = wall.a.y;
    const x2: number = wall.b.x;
    const y2: number = wall.b.y;

    const x3: number = this.vec.pos.x;
    const y3: number = this.vec.pos.y;
    const x4: number = this.vec.pos.x + this.vec.dir.x;
    const y4: number = this.vec.pos.y + this.vec.dir.y;

    const den: number = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) return undefined;

    const t: number = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u: number = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
      const X: number = x1 + t * (x2 - x1);
      const Y: number = y1 + t * (y2 - y1);
      const l: number = this.distance({ x: X, y: Y }, this.vec.pos);
      if (l <= this.length) {
        return {
          x: X,
          y: Y,
        };
      }
    } else return undefined;
  }

  distance = (a: IPoint, b: IPoint): number => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}
