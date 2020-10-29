import Wall from './Wall.js';

export default class Map implements IMap {
  walls: IWall[] = new Array();
  constructor() {
    for (let i = 0; i < 8; i++) {
      const newWall: IWall = new Wall({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }, { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
      this.walls.push(newWall);
    }
  }
}
