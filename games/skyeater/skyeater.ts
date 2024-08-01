class TextWriter {
  constructor() {}

  public writeTitle(text:string, ctx:CanvasRenderingContext2D) {

  }

  public testFunction(): Promise<Image> {
    return new Promise((resolve, reject) => {
      const testImage = new Image();
      testImage.src = "./Fonts/Title.png";
      testImage.onload = () => {
        resolve(testImage);
      };
      testImage.onerror = (e) => { reject(e); }
    });
  }
  public writeText(text:string, fontStyle:string, size:number, x:number, y:number, ctx:CanvasRenderingContext2D) {
    const startX = x;
    for (const character of text) {
      //ctx.drawImage(this.characterFinder(character, fontStyle), x, y, size, size);
      x += size * 1.2;
    }
  }

  private characterFinder(character:string, fontStyle:string) {
    const returnImg = new Image(20, 20) as HTMLImageElement;
    let sx, sy, sw, sh = 0;
    if (fontStyle == "Title") {
      returnImg.src = "./Fonts/Title.png";
      sw = 500;
      sh = 500;

      switch (character.toLowerCase()) {
        case 'a':
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
}

class SkyEater {
  textWriter = new TextWriter();
  
  constructor() {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.loadResources(ctx);
  }

  async loadResourcesAsync(ctx: CanvasRenderingContext2D) {
    try {
    const [img1, img2] = await Promise.all([this.textWriter.testFunction(), this.textWriter.testFunction()]);
    ctx.drawImage(img1, 0, 0, 500, 500, 0, 0, 100, 100);
    ctx.drawImage(img2, 0, 0, 500, 500, 100, 100, 100, 100);
    //this.textWriter.writeText('a', 'Title', 100, 100, 100, ctx);
    } catch (e) {
      console.error("WTF?", e);
    }
  }

  loadResources(ctx: CanvasRenderingContext2D) {
    Promise.all([this.textWriter.testFunction(), this.textWriter.testFunction()]).then(([img1, img2]) => {
      ctx.drawImage(img1, 0, 0, 500, 500, 0, 0, 100, 100);
      ctx.drawImage(img2, 0, 0, 500, 500, 100, 100, 100, 100);
    }).catch((e) => {
      console.error("WTF?", e);
    });
  }

}


new SkyEater();
