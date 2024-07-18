import { waitFor } from "../../universal/universal.js";
import { Player } from "./player.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext('2d');

let lastKeyPressed;
window.addEventListener('keydown', storeKey);
window.addEventListener('keyup', emptyKey);
function storeKey(e) {
  console.log(e.key);
  lastKeyPressed = e.key;
}
function emptyKey(e) {
  lastKeyPressed = undefined;
  console.log(lastKeyPressed);
}

const player = new Player(20, 450);

function paintBK() {
  ctx.fillStyle = 'lightBlue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function paint() {
  paintBK();
  player.paintPlayer(ctx);
}

async function gameloop() {
  while(true) {
    player.tick(lastKeyPressed);
    paint();
    await waitFor(10);
  }
}

gameloop();