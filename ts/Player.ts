import Ray from './Ray.js';

export default class Player implements IPlayer {
  vec: IVector;
  rays: IRay[] = new Array();
  constructor(vec: IVector) {
    this.vec = vec;
    for (let i = 0; i < 360; i += 0.5) {
      const newRay: IRay = new Ray({ ...this.vec });
      newRay.vec.dir = this.rad2point(this.radians(i));
      this.rays.push(newRay);
    }
  }

  setPos(newPos: IPoint) {
    this.vec.pos = newPos;
    this.rays.forEach((r: IRay) => {
      r.vec.pos = newPos;
    });
  }

  closestPoint(points: IPoint[]): IPoint | undefined {
    let index: number = 0;
    let smallestLength: number = Infinity;
    if (points.length === 0) return undefined;
    else {
      for (let i = 0; i < points.length; i++) {
        const l: number = this.distance(this.vec.pos, points[i]);
        if (l < smallestLength) {
          smallestLength = l;
          index = i;
        }
      }
    }
    return points[index];
  }

  distance = (a: IPoint, b: IPoint): number => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  radians = (angle: number): number => angle * (Math.PI / 180);
  rad2point = (rad: number): IPoint => ({ x: Math.cos(rad), y: Math.sin(rad) });
}
