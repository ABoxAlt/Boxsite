class textWriter {
  constructor() {}

  public writeTitle(text:string, ctx:CanvasRenderingContext2D) {

  }

  public writeText(text:string, fontStyle:string, size:number, x:number, y:number, ctx:CanvasRenderingContext2D) {
    const startX = x;
    for (const character of text) {
      ctx.drawImage(this.characterFinder(character, fontStyle), x, y, size, size);
      x += size * 1.2;
    }
  }

  private characterFinder(character:string, fontStyle:string) {
    const returnImg = new Image();
    returnImg.src = "./Fonts/Title/Title00.png";
    if (fontStyle == "Title") {
      switch (character.toLowerCase()) {
        case "a":
          returnImg.src = "./Fonts/Title/Title00.png";
          break;
        default:
          returnImg.src = "./Fonts/Title/Title00.png";
          break;
      }
    }
    return returnImg;
  }
}

class SkyEater {
  textWriter = new textWriter();
  
  constructor() {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx!.fillStyle = 'white';
    ctx!.fillRect(0, 0, canvas.width, canvas.height);

    this.textWriter.writeText('a', 'Title', 100, 100, 100, ctx!);
  }

}


new SkyEater();
