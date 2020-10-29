export default class Draw implements IDraw {
  ctx: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D | any) {
    this.ctx = context;
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 3;
  }

  map(map: IMap) {
    map.walls.forEach((w) => {
      this.wall(w);
    });
  }

  wall(wall: IWall) {
    this.ctx.beginPath();
    this.ctx.moveTo(wall.a.x, wall.a.y);
    this.ctx.lineTo(wall.b.x, wall.b.y);
    this.ctx.stroke();
  }

  player(p: IPlayer, map: IMap) {
    p.rays.forEach((r: IRay) => {
      const collisions: IPoint[] = new Array();
      map.walls.forEach((wall) => {
        const collision: IPoint | undefined = r.cast(wall);
        if (collision !== undefined) collisions.push(collision);
      });
      this.ray(r, p.closestPoint(collisions));
    });
  }

  ray(ray: IRay, point?: IPoint) {
    this.ctx.beginPath();
    this.ctx.globalAlpha = 0.08;
    this.ctx.moveTo(ray.vec.pos.x, ray.vec.pos.y);
    if (point === undefined) this.ctx.lineTo(ray.vec.pos.x + ray.vec.dir.x * ray.length, ray.vec.pos.y + ray.vec.dir.y * ray.length);
    else this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
    this.ctx.globalAlpha = 1;
  }
}
