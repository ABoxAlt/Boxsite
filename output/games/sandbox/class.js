const canImg = document.querySelector("#canImg");
export class Can {
  floors = [550];
  walls = [0, 800];
  x = 0;
  y = 0;
  pickedUp = false;
  color = 'red';
  height = 80;
  width = 40;
  // velocity
  velX = 0;
  velY = 1;
  standardVelocityY = .1;
  standardVelocityX = .05;
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

  applyXVel() {
    for (const wall of this.walls) {
      if (this.velX > 0) {
        if (this.x + this.width < wall && this.x + this.width + this.velX < wall) {
          this.x += this.velX;
          console.log('0', wall);
          break;
        } else if (this.x + this.width <= wall) {
          this.x = wall - this.width;
          this.velX *= -1;
          console.log('1', wall);
          break;
        } 
      }
      if (this.velX < 0) {
        if (this.x > wall && this.x + this.velX > wall) {
          this.x += this.velX;
          console.log('2', wall);
          break;
        } else if (this.x >= wall) {
          // this is because velX will be negative when traveling to the right side of a wall
          this.x = wall + this.width;
          this.velX *= -1;
          console.log('3', wall);
          break;
        }
      }
    }

    if (this.velX < 1 && this.velX > -1) {
      this.velX = 0;
    } else if (this.velX > 0) {
      this.velX -= this.standardVelocityX;
    } else if (this.velX < 0) {
      this.velX += this.standardVelocityX;
    }
  }

  moveTo(X, Y) {
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
    ctx.drawImage(canImg, this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  tick(ctx) {
    if (!this.pickedUp) {
      if (this.velY != 0) {
        this.fall();
      }
      if (this.velX != 0) {
        this.applyXVel();
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