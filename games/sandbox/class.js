export class Can {
  floors = [550];
  x = 0;
  y = 0;
  color = 'red';
  height = 40;
  width = 20;
  // velocity
  velX = 0;
  velY = this.height / 4;


  constructor(X, Y, Color) {
    this.x = X;
    this.y = Y;
    this.color = Color;
  }

  fall() {
    for (const floor of this.floors) {
      if (this.y + this.height < floor && this.y + this.height + this.velY < floor) {
        this.y += this.velY;
      } else if (this.y + this.height < floor && this.y + this.height + this.velY >= floor) {
        this.y = floor - this.height;
        this.velY = 0;
      }
    }
  }

  moveTo(X, Y) {
    this.x = X;
    this.y = Y
  }

  touchingCan(objX, objY) {
    if (objX >= this.x && objX <= this.x + this.width && objY >= this.y && objY <= this.y + this.height) {
      return true;
    }
  }

  paint(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  tick(ctx) {
    if (this.velY > 0 || this.velX > 0) {
      this.fall();
    }
    this.paint(ctx);
  }


}