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
  input: -1
}
const universalFloors = [550];
// Cans on canvas
const cans = [];
// Floor levels
// -- Will be universal floors, can be passed through when they are being held but otherwise are solid
// -- All Y coordinates


// Event listeners and their functions
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('click', mouseClick);
canvas.addEventListener('contextmenu', rightMouseClick);

function mouseMove(e) {
  mouseData.x = e.offsetX;
  mouseData.y = e.offsetY;
}

function mouseClick(e) {
  if (game) {
    mouseData.x = e.offsetX;
    mouseData.y = e.offsetY;
    mouseData.input = e.button;
  } else {
    gameloop();
  }
}

function rightMouseClick(e) {
  e.preventDefault();
  mouseData.input = 1;
}

// Cursor ability functions
function spawn() {
  for (const floor of universalFloors) {
    if (mouseData.y > floor) {
      console.log('returned');
      return;
    }
  }
  cans.push(new Can(mouseData.x, mouseData.y, 'red'));
}

function shoot() 
{
  for (let can of cans) {
    if (can.touchingCan(mouseData.x, mouseData.y)) {
      cans.splice(cans.indexOf(can), 1);
      can = 0;
    }
  }
}

// Paint the Cursor
function paintCursor() {
  ctx.save();
  switch(mouseData.state) {
    case 0:
      ctx.fillStyle = 'red';
      break;
    case 1:
      ctx.fillStyle = 'blue';
      break;
    case 2:
      ctx.fillStyle = 'green';
  }
  ctx.fillRect(mouseData.x -5, mouseData.y -5, 10, 10);
  ctx.restore();
}



function paint() {
  ctx.fillStyle = 'navy';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

async function gameloop() {
  while (true) {
    await waitFor(1);
    if (mouseData.input == 0) {
      switch (mouseData.state) {
        case 0:
          spawn();
          mouseData.input = -1;
          break;
        case 1:
          mouseData.input = -1;
          break;
        case 2:
          shoot();
          mouseData.input = -1;
      }
    } else if (mouseData.input == 1) {
      if (mouseData.state < 2) {
        mouseData.state ++;
      } else {
        mouseData.state = 0;
      }
      mouseData.input = -1;
      console.log(mouseData.state);
    }
    paint();
    for (const can of cans) {
      can.tick(ctx);
    }
    paintCursor();
  }
}

gameloop();