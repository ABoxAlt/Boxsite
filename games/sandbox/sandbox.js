// Imports
// import {Can} from './class';
import {waitFor} from '../../universal/universal.js';
// Canvas and ctx
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
// Mouse Data
let mouseData = {
  x:0,
  y:0,
  input:false
}

canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('click', mouseClick);

function mouseMove(e) {
  mouseData.x = e.offsetX;
  mouseData.y = e.offsetY;
  console.log(mouseData.x, mouseData.y);
}

function mouseClick(e) {
  if (game) {
    mouseData.x = e.offsetX;
    mouseData.y = e.offsetY;
    mouseData.input = true;
  } else {
    gameLoop();
  }
}
function paintCursor() {
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.fillRect(mouseData.x -5, mouseData.y -5, 10, 10);
  ctx.restore();
}

function paint() {
  ctx.fillStyle = 'navy';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  paintCursor();
}

async function gameloop() {
  while (true) {
    await waitFor(1);
    paint();
  }
}

gameloop();