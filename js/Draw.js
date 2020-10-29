export default class Draw {
    constructor(context) {
        this.ctx = context;
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 3;
    }
    map(map) {
        map.walls.forEach((w) => {
            this.wall(w);
        });
    }
    wall(wall) {
        this.ctx.beginPath();
        this.ctx.moveTo(wall.a.x, wall.a.y);
        this.ctx.lineTo(wall.b.x, wall.b.y);
        this.ctx.stroke();
    }
    player(p, map) {
        p.rays.forEach((r) => {
            const collisions = new Array();
            map.walls.forEach((wall) => {
                const collision = r.cast(wall);
                if (collision !== undefined)
                    collisions.push(collision);
            });
            this.ray(r, p.closestPoint(collisions));
        });
    }
    ray(ray, point) {
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.08;
        this.ctx.moveTo(ray.vec.pos.x, ray.vec.pos.y);
        if (point === undefined)
            this.ctx.lineTo(ray.vec.pos.x + ray.vec.dir.x * ray.length, ray.vec.pos.y + ray.vec.dir.y * ray.length);
        else
            this.ctx.lineTo(point.x, point.y);
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }
}
