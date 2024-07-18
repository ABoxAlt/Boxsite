// var declaration
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const score = document.querySelector('#score');
const timer = document.querySelector('#timer');
// the color the player needs to click
let curColor = 'red';
// score data
let scr = 0;
let prevScr = 500;
// timer data
let time = 30000;
// errors remaining
let err = 3;
// game started?
let game = false;
// mouse data
let mouseData = {
  x:0,
  y:0,
  input:false
}
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// event listeners & their functions

canvas.addEventListener('click', mouseClick);

function mouseClick(e) {
  if (game) {
    mouseData.x = e.offsetX;
    mouseData.y = e.offsetY;
    mouseData.input = true;
  } else {
    gameLoop();
  }
}

// game functions
// generates a new board
function generateBoard() {
  board = [];
  curColor = getColor(Math.floor(Math.random() * 9));
  while (!board.some((x) => getColor(x) == curColor)) {
    board = [];
    for (let i = 0; i < 9; i++) {
      board.push(Math.floor(Math.random() * 9));
    }
  }
}
// gets the square at x, y if there is no square it returns -1
function getSquare(x, y) {
  if (x >= 0 && x <= 100) {
    x = 0;
  } else if (x > 100 && x <= 200) {
    x = 1;
  } else if (x > 200 && x <= canvas.width) {
    x = 2;
  } else {
    return -1;
  }

  if (y >= 100 && y <= 200) {
    y = 0;
  } else if (y > 200 && y <= 300) {
    y = 1;
  } else if (y > 300 && y <= 400) {
    y = 2;
  } else {
    return -1;
  }
  return (y * 3) + x;
}

// removes the square if it has the same color as the current color
function removeSquare(squareNum) {
  if (getColor(board[squareNum]) == curColor) {
    board[squareNum] = -1;
    checkBoard();
  } else if (squareNum != -1 && getColor(board[squareNum]) != 'white') {
    err --;
  }
}


function checkBoard() {
  if (!board.some((x) => getColor(x) == curColor)) {
    scr += board.filter((x) => x == -1).length * 100;
    score.textContent = 'Score : ' + scr;
    generateBoard();
  }
}

// paint functions -------------------
function getColor(num) {
  switch (num) {
    case -1:
      return 'white';
    case 0:
      return 'red';
    case 1:
      return 'orange';
    case 2:
      return 'yellow';
    case 3:
      return 'green';
    case 4:
      return 'blue';
    case 5:
      return 'purple';
    case 6:
      return 'saddlebrown';
    case 7:
      return 'pink';
    case 8:
      return 'grey'
  }
}
function drawMistakes() {
  ctx.save();
  ctx.fillStyle = 'skyBlue';
  for (let i = 0; i < err; i ++) {
    ctx.fillRect(i * 100, 50, 100, 20);
  }
  ctx.restore();
}

function drawBoard() {
  ctx.save();
  for (let y = 0; y < 3; y ++) {
    for (let x = 0; x < 3; x++) {
      ctx.fillStyle = getColor(board[(y * 3) + x]);
      ctx.fillRect(0 + (x * 100), 100 + (y * 100), 100, 100);
    }
  }
  ctx.restore();
}

function paint() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = curColor;
  ctx.fillRect(0, 0, canvas.width, 50);
  drawBoard();
  drawMistakes();
}
// -----------------

// gameloop and testing
async function waitFor(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  })
}
async function gameLoop() {
  time = 30000;
  err = 3;
  scr = 0;
  score.textContent = 'Score : 0';
  game = true;
  generateBoard();
  paint();
  while (true) {
    if (mouseData.input) {
      mouseData.input = false;
      removeSquare(getSquare(mouseData.x, mouseData.y));
      paint();
    }
    await waitFor(1000 / 120);
    if (scr >= prevScr) {
      time += 2000;
      prevScr += 500;
    }
    time -= 1000 / 120;
    timer.textContent = 'Seconds : ' + Math.floor(time / 1000);
    if (time <= 0) {
      timer.textContent = 'Game Over';
      break;
    } else if (err <= 0) {
      timer.textContent = 'Game Over';
      break;
    }
    
  }
  await waitFor(2000);
  game = false;
}
ctx.save();
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.restore();