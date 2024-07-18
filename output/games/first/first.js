// html elements declaration
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

// game vars
const boxDim = 25;
let boxX = 0;
let boxY = 0;

window.addEventListener('keydown', move);

function paintBox() {
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(boxX, boxY, boxDim, boxDim);
  ctx.restore();
}

function paint() {
  ctx.fillStyle = '#73E2A7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  paintBox();
}

function tick() {
  paint();
}

function move(keyboard) {
  console.log(keyboard.key);
  switch(keyboard.key) {
    case 'w':
      if (boxY > 0) {
        boxY -= 3;
      }
      break;
    case 's':
      if (boxY < canvas.height - boxDim) {
        boxY += 3;
      }
      break;
    case 'a':
      if (boxX > 0) {
        boxX -= 3;
      }
      break;
    case 'd':
      if (boxX < canvas.width - boxDim) {
        boxX += 3;
      }
      break;
  }
  paint();
}

paint();