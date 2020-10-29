interface IPoint {
  x: number;
  y: number;
}

interface IVector {
  pos: IPoint;
  dir: IPoint;
}

interface IWall {
  a: IPoint;
  b: IPoint;
}

interface IMap {
  walls: IWall[];
}

interface IRay {
  vec: IVector;
  length: number;
  normalizeDir(): void;
  lookAt(point: IPoint | undefined): void;
  cast(wall: IWall): IPoint | undefined;
  distance(a: IPoint, b: IPoint): number;
}

interface IPlayer {
  vec: IVector;
  rays: IRay[];
  setPos(newPos: IPoint): void;
  closestPoint(points: IPoint[]): IPoint | undefined;
  distance(a: IPoint, b: IPoint): number;
  radians(angle: number): number;
  rad2point(rad: number): IPoint;
}

interface IDraw {
  ctx: CanvasRenderingContext2D;
  map(map: IMap): void;
  wall(wall: IWall): void;
  player(p: IPlayer, map: IMap): void;
  ray(ray: IRay, point?: IPoint): void;
}
