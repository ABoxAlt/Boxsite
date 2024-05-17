export class Can {
  floors = [550];
  x = 0;
  y = 0;
  pickedUp = false;
  color = 'red';
  height = 40;
  width = 20;
  // velocity
  velX = 0;
  velY = 1;
  standardVelocityY = .1;
  moveOffsetX = 0;
  moveOffsetY = 0;

  constructor(X, Y, Height, Color) {
    this.x = X;
    this.y = Y;
    this.color = Color;
    this.height = Height;
  }

  resetYVel() {
    this.velY = this.standardVelocityY;
  }

  applyXVel(velocity) {
    this.velX = velocity;
  }

  fall() {
    for (const floor of this.floors) {
      if (this.y + this.height < floor && this.y + this.height + this.velY < floor) {
        this.y += this.velY;
      } else if (this.y + this.height < floor && this.y + this.height + this.velY >= floor) {
        this.y = floor - this.height;
        this.velY = -(this.velY / 2);
        return;
      } else if (this.velY < 0) {
        this.y += this.velY;
      }
    }
    if (this.velY > 0) {
      this.velY += this.standardVelocityY;
    } else if (this.velY < 0 && this.velY + this.standardVelocityY <= 0) {
      this.velY += this.standardVelocityY;
    } else {
      this.velY = this.standardVelocityY;
    }
  }

  moveTo(X, Y) {
    console.log(this.moveOffsetX, this.moveOffsetY);
    this.x = X - this.moveOffsetX;
    this.y = Y - this.moveOffsetY;
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
    if (!this.pickedUp) {
      if (this.velY != 0 || this.velX != 0) {
        this.fall();
      }
    } else {
      // if it is picked up this will run
    }
    this.paint(ctx);
  }


}

/*

  fall() {
    for (const floor of this.floors) {
      if (this.y + this.height < floor && this.y + this.height + this.velY < floor) {
        this.y += this.velY;
      } else if (this.y + this.height < floor && this.y + this.height + this.velY >= floor) {
        this.y = floor - this.height;
        this.velY = -(this.velY / 2);
        return;
      } else if (this.velY < 0) {
        this.y += this.velY;
      }
    }
    if (this.velY > 0) {
      this.velY += this.standardVelocityY;
    } else if (this.velY < 0 && this.velY + this.standardVelocityY <= 0) {
      this.velY += this.standardVelocityY;
    }
  }
  */