import Wall from './Wall.js';
export default class Map {
    constructor() {
        this.walls = new Array();
        for (let i = 0; i < 8; i++) {
            const newWall = new Wall({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }, { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
            this.walls.push(newWall);
        }
    }
}
