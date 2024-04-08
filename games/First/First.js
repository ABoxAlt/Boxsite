const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let timeout = 60;
function drawGame() {
  setTimeout(drawGame, 1000 / timeout);
}

drawGame();