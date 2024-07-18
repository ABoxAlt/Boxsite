(() => {
  // skyeater.ts
  var SkyEater = class {
    constructor() {
      const canvas = document.getElementById("game");
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };
  console.log("code ran 2");
  new SkyEater();
})();
