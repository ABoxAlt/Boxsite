(() => {
  // skyeater.ts
  var TextWriter = class {
    constructor() {
    }
    writeTitle(text, ctx) {
    }
    testFunction() {
      return new Promise((resolve, reject) => {
        const testImage = new Image();
        testImage.src = "./Fonts/Title.png";
        testImage.onload = () => {
          resolve(testImage);
        };
        testImage.onerror = (e) => {
          reject(e);
        };
      });
    }
    writeText(text, fontStyle, size, x, y, ctx) {
      const startX = x;
      for (const character of text) {
        x += size * 1.2;
      }
    }
    characterFinder(character, fontStyle) {
      const returnImg = new Image(20, 20);
      let sx, sy, sw, sh = 0;
      if (fontStyle == "Title") {
        returnImg.src = "./Fonts/Title.png";
        sw = 500;
        sh = 500;
        switch (character.toLowerCase()) {
          case "a":
            sx = 0;
            sy = 0;
            break;
          default:
            sx = 0;
            sy = 0;
            break;
        }
      }
      return createImageBitmap(returnImg, sx, sy, sw, sh);
    }
  };
  var SkyEater = class {
    textWriter = new TextWriter();
    constructor() {
      const canvas = document.getElementById("game");
      const ctx = canvas.getContext("2d");
      this.loadResources(ctx);
    }
    async loadResourcesAsync(ctx) {
      try {
        const [img1, img2] = await Promise.all([this.textWriter.testFunction(), this.textWriter.testFunction()]);
        ctx.drawImage(img1, 0, 0, 500, 500, 0, 0, 100, 100);
        ctx.drawImage(img2, 0, 0, 500, 500, 100, 100, 100, 100);
      } catch (e) {
        console.error("WTF?", e);
      }
    }
    loadResources(ctx) {
      Promise.all([this.textWriter.testFunction(), this.textWriter.testFunction()]).then(([img1, img2]) => {
        ctx.drawImage(img1, 0, 0, 500, 500, 0, 0, 100, 100);
        ctx.drawImage(img2, 0, 0, 500, 500, 100, 100, 100, 100);
      }).catch((e) => {
        console.error("WTF?", e);
      });
    }
  };
  new SkyEater();
})();
