(() => {
  // skyeater.ts
  var textWriter = class {
    constructor() {
    }
    writeTitle(text, ctx) {
    }
    writeText(text, fontStyle, size, x, y, ctx) {
      const startX = x;
      for (const character of text) {
        ctx.drawImage(this.characterFinder(character, fontStyle), x, y, size, size);
        x += size * 1.2;
      }
    }
    characterFinder(character, fontStyle) {
      const returnImg = new Image();
      returnImg.src = "./Fonts/Title/Title00.png";
      if (fontStyle == "Title") {
        switch (character.toLowerCase()) {
          case "a":
            returnImg.src = "./Fonts/Title/Title00.png";
          default:
            returnImg.src = "./Fonts/Title/Title00.png";
        }
      }
      return returnImg;
    }
  };
  var SkyEater = class {
    textWriter = new textWriter();
    constructor() {
      const canvas = document.getElementById("game");
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.textWriter.writeText("a", "Title", 100, 100, 100, ctx);
    }
  };
  new SkyEater();
})();
