(() => {
  // skyeater.ts
  var tempImg = document.querySelector("#tempImage");
  var textWriter = class {
    constructor() {
    }
    writeTitle(text, ctx) {
    }
    writeText(text, fontStyle, size, x, y, ctx) {
      for (const character of text) {
        ctx.drawImage(this.characterFinder(character, fontStyle), x, y, size, size);
      }
    }
    characterFinder(character, fontStyle) {
      if (fontStyle == "Title") {
        switch (character) {
          case "A":
            return tempImg;
          default:
            return tempImg;
        }
      }
      return tempImg;
    }
  };
  var SkyEater = class {
    textWriter = new textWriter();
    constructor() {
      const canvas = document.getElementById("game");
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };
  new SkyEater();
})();
