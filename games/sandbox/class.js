const floors = [550];
export class Can {
  x = 0;
  y = 0;
  color = 'red';
  height = 40;
  // velocity
  velX = 0;
  velY = this.height / 4;


  constructor(X, Y, Color) {
    this.x = X;
    this.y = Y;
    this.color = Color;
  }
  fall() {
    for (const floor of floors) {
      if (this.y + this.height < floor && this.y + this.height + this.velY < floor) {
        this.y += this.velY;
      } else if (this.y + this.height < floor && this.y + this.height + this.velY >= floor) {
        this.y = floor - this.height;
        this.velY = 0;
      }
    }
  }
  
  paint(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 20, this.height);
    ctx.restore();
  }

  tick(ctx) {
    if (this.velY > 0 || this.velX > 0) {
      this.fall();
    }
    this.paint(ctx);
  }
}