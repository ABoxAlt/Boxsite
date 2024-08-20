(() => {
  // skyeater.ts
  var TextWriter = class {
    letterSpacing = 1.1;
    constructor() {
    }
    getLetterSpriteIdx(ASCIICode) {
      return ASCIICode - 97;
    }
    getSpriteSheetIdx(FontStyle) {
      switch (FontStyle) {
        case "Title":
          this.letterSpacing = 1.1;
          return 0;
        default:
          throw new console.error("That is not a registered font");
      }
    }
    writeTitle(text, x, y, width, height, spritelib, ctx) {
      this.letterSpacing = 1.1;
      for (const letter of text) {
        spritelib.drawSprite(0, 0, this.getLetterSpriteIdx(letter.toLowerCase().charCodeAt(0)), x, y, width, height, ctx);
        x += width * this.letterSpacing;
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
    getSpriteSheetImg(sheetIdx) {
      return this.spriteLib[sheetIdx].srcImg;
    }
    getSpriteSheet(sheetIdx) {
      return this.spriteLib[sheetIdx];
    }
    getAnimation(sheetIdx, animationIdx) {
      return this.spriteLib[sheetIdx][animationIdx];
    }
    drawSprite(sheetIdx, animationIdx, spriteIdx, x, y, width, height, ctx) {
      const sprite = this.spriteLib[sheetIdx].spriteSheet[animationIdx][spriteIdx];
      ctx.drawImage(sprite.src, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x, y, width, height);
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
      this.textWriter.writeTitle("Hello", 50, 50, 100, 100, this.spriteLib, this.ctx);
    }
    // Loads all images being used
  };
  new SkyEater();
})();
