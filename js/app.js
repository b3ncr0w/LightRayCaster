import Player from './Player.js';
import Map from './Map.js';
import Draw from './Draw.js';
// init environment
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
const draw = new Draw(ctx);
// init scene
const playerVec = { pos: { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, dir: { x: 0, y: 0 } };
const player = new Player(playerVec);
const map = new Map();
// mouse events
let mousePos = playerVec.pos;
canvas.addEventListener('mousemove', (e) => {
    mousePos = { x: e.x, y: e.y };
});
function animate() {
    requestAnimationFrame(animate);
    if (ctx !== null)
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // main loop
    if (mousePos !== undefined)
        player.setPos(mousePos);
    draw.player(player, map);
    draw.map(map);
}
animate();
