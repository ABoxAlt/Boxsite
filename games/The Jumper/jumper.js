import { waitFor } from "../../universal/universal";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext('2d');

function paintBK() {
  ctx.fillStyle = 'lightBlue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function paint() {
  paintBK();
}

async function gameloop() {
  while(true) {
    paint();
    await waitFor(300);
  }
}

gameloop();