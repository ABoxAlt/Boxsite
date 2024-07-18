export class Player {
  playerX = 0;
  playerY = 0;
  constructor(x, y) 
  {
    this.playerX = x;
    this.playerY = y;
  }

  playerInput(key) {
    switch (key) {
      case 'w':
        break;
      case 'a':
        this.playerX -= 5;
        break;
      case 's':
        break;
      case 'd':
        this.playerX += 5;
        break;
      default:
        console.log('no move key pressed');
    }
  }

  paintPlayer(ctx) {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.playerX, this.playerY, 50, 100);
    ctx.restore();
  }

  tick(key) {
    this.playerInput(key);
  }
}