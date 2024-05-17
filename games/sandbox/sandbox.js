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
  input: -1,
  objInHand: -1,
};
const universalFloors = [550];
// Cans on canvas
const objects = {
  Cans: []
};
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
function spawn(height) {
  for (const floor of universalFloors) {
    if (mouseData.y > floor - height) {
      console.log('Can attempted to spawn within the ground.');
      return;
    }
  }
  objects.Cans.push(new Can(mouseData.x, mouseData.y, height, 'red'));
}

function shoot() 
{
  for (let can of objects.Cans) {
    if (can.touchingCan(mouseData.x, mouseData.y)) {
      objects.Cans.splice(objects.Cans.indexOf(can), 1);
      can = 0;
    }
  }
}

function moveObject() {
  if (mouseData.objInHand == -1) {
    for (const type of Object.values(objects)) {
      for (const thing of type) {
        if (mouseData.x >= thing.x && mouseData.x <= thing.x + thing.width &&
            mouseData.y >= thing.y && mouseData.y <= thing.y + thing.height
        ) {

          thing.moveOffsetX = mouseData.x - thing.x;
          thing.moveOffsetY = mouseData.y - thing.y;
          thing.pickedUp = true;
          mouseData.objInHand = thing;
        }
      }
    }
  } else {
    for (const floor of universalFloors) {
      if (mouseData.y < floor - mouseData.objInHand.height) {
        mouseData.objInHand.pickedUp = false;
        mouseData.objInHand.resetYVel();
        mouseData.objInHand.applyXVel(/*add in the calculations for mouse velocity*/);
        mouseData.objInHand = -1;
      }
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
          spawn(40);
          mouseData.input = -1;
          break;
        case 1:
          moveObject();
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
    } else if (mouseData.objInHand != -1) {
      mouseData.objInHand.moveTo(mouseData.x, mouseData.y);
    }
    paint();
    for (const can of objects.Cans) {
      can.tick(ctx);
    }
    paintCursor();
  }
}

gameloop();