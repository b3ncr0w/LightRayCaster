import Ray from './Ray.js';
export default class Player {
    constructor(vec) {
        this.rays = new Array();
        this.distance = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        this.radians = (angle) => angle * (Math.PI / 180);
        this.rad2point = (rad) => ({ x: Math.cos(rad), y: Math.sin(rad) });
        this.vec = vec;
        for (let i = 0; i < 360; i += 0.5) {
            const newRay = new Ray(Object.assign({}, this.vec));
            newRay.vec.dir = this.rad2point(this.radians(i));
            this.rays.push(newRay);
        }
    }
    setPos(newPos) {
        this.vec.pos = newPos;
        this.rays.forEach((r) => {
            r.vec.pos = newPos;
        });
    }
    closestPoint(points) {
        let index = 0;
        let smallestLength = Infinity;
        if (points.length === 0)
            return undefined;
        else {
            for (let i = 0; i < points.length; i++) {
                const l = this.distance(this.vec.pos, points[i]);
                if (l < smallestLength) {
                    smallestLength = l;
                    index = i;
                }
            }
        }
        return points[index];
    }
}
