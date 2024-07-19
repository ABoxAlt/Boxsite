const tempImg = document.querySelector("#tempImage") as HTMLImageElement;
class textWriter {
  constructor() {}

  public writeTitle(text:string, ctx:CanvasRenderingContext2D) {

  }

  public writeText(text:string, fontStyle:string, size:number, x:number, y:number, ctx:CanvasRenderingContext2D) {
    for (const character of text) {
      ctx.drawImage(this.characterFinder(character, fontStyle), x, y, size, size)
    }
  }

  private characterFinder(character:string, fontStyle:string) {
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
}

class SkyEater {
  textWriter = new textWriter();
  
  constructor() {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx!.fillStyle = 'black';
    ctx!.fillRect(0, 0, canvas.width, canvas.height);

    //this.textWriter.writeText('e', 'Title', 100, 100, 100, ctx!);
  }

}


new SkyEater();
