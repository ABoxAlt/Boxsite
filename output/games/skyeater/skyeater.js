(() => {
  // skyeater.ts
  var TextWriter = class {
    constructor() {
    }
    writeText(text, fontStyle, size, x, y, ctx) {
      const startX = x;
      for (const character of text) {
        x += size * 1.2;
      }
    }
  };
  var SpriteLib = class {
    spriteLib;
    isLoaded;
    constructor() {
      let sprites = [];
      this.isLoaded = this.loadResources(sprites);
      this.spriteLib = sprites;
      console.log(this.spriteLib[0]);
    }
    async loadResources(sprites) {
      try {
        const [testFont] = await Promise.all([this.loadImage("./Fonts/Title.png")]);
        let spriteArray = [];
        for (let i = 0; i < 26; i++) {
          spriteArray.push(new Sprite(testFont, i % 5 * 500, Math.floor(i / 5) * 500, 500, 500));
        }
        let spriteSheet = new SpriteSheet(testFont);
        spriteSheet.addAnimation(spriteArray);
        sprites.push(spriteSheet);
      } catch (e) {
        console.error("WTF?", e);
        throw e;
      }
    }
    // Loads individual images
    loadImage(img) {
      return new Promise((resolve, reject) => {
        const newImage = new Image();
        newImage.src = img;
        newImage.onload = () => {
          resolve(newImage);
        };
        newImage.onerror = (e) => {
          reject(e);
        };
      });
    }
    getSpriteSheet(sheetIdx) {
      return this.spriteLib[sheetIdx].srcImg;
    }
    getAnimation(sheetIdx, animationIdx) {
      return this.spriteLib[sheetIdx][animationIdx];
    }
    getSprite(sheetIdx, animationIdx, spriteIdx) {
      return this.spriteLib[sheetIdx][animationIdx][spriteIdx];
    }
  };
  var SpriteSheet = class {
    spriteSheet = [];
    srcImg;
    constructor(SRC) {
      this.srcImg = SRC;
    }
    addAnimation(animation) {
      this.spriteSheet.push(animation);
    }
  };
  var Sprite = class {
    src;
    sx;
    sy;
    sw;
    sh;
    constructor(Src, Sx, Sy, Sw, Sh) {
      this.src = Src;
      this.sx = Sx;
      this.sy = Sy;
      this.sw = Sw;
      this.sh = Sh;
    }
  };
  var SkyEater = class {
    // Declaring Variables
    canvas;
    ctx;
    textWriter = new TextWriter();
    spriteLib;
    constructor() {
      this.canvas = document.getElementById("game");
      this.ctx = this.canvas.getContext("2d");
      this.spriteLib = new SpriteLib();
      void this.run();
    }
    async run() {
      await this.spriteLib.isLoaded;
      this.ctx.drawImage(this.spriteLib.getSpriteSheet(0), 0, 0, 500, 500, 0, 0, 200, 200);
    }
    // Loads all images being used
  };
  new SkyEater();
})();
