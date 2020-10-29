export default class Wall implements IWall {
  a: IPoint;
  b: IPoint;
  constructor(a: IPoint, b: IPoint) {
    this.a = a;
    this.b = b;
  }
}
