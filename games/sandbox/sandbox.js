// Imports
import {Can} from './class.js';
import {waitFor} from '../../universal/universal.js';
// Canvas and ctx
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
// Mouse Data
let mouseData = {
  x:0,
  y:0,
  state: 0,
  input:false
}
// Cans on canvas
const cans = [];

// Event listeners and their functions
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('click', mouseClick);

function mouseMove(e) {
  mouseData.x = e.offsetX;
  mouseData.y = e.offsetY;
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

function spawn() {
  cans.push(new Can(mouseData.x, mouseData.y, 'red'));
  console.log(cans[cans.length - 1].x);
}

// Paint the Cursor
function paintCursor() {
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.fillRect(mouseData.x -5, mouseData.y -5, 10, 10);
  ctx.restore();
}

function paintCans() {
  for (const can of cans) {
    ctx.save();
    ctx.fillStyle = can.color;
    ctx.fillRect(can.x, can.y, 20, 40);
    ctx.restore();
  }
}

function paint() {
  ctx.fillStyle = 'navy';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  paintCursor();
  paintCans();
}

async function gameloop() {
  while (true) {
    await waitFor(1);
    if (mouseData.input) {
      switch (mouseData.state) {
        case 0:
          spawn();
          mouseData.input = false;
          break;
      }
    }
    paint();
  }
}

gameloop();