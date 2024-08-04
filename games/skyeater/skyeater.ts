/* Unused

  loadResources(ctx: CanvasRenderingContext2D) {
    Promise.all([this.textWriter.testFunction(), this.textWriter.testFunction()]).then(([img1, img2]) => {
      ctx.drawImage(img1, 0, 0, 500, 500, 0, 0, 100, 100);
      ctx.drawImage(img2, 0, 0, 500, 500, 100, 100, 100, 100);
    }).catch((e) => {
      console.error("WTF?", e);
    });
  }

*/

// Used to write in game text
class TextWriter {
  constructor() {}

  public writeText(text:string, fontStyle:string, size:number, x:number, y:number, ctx:CanvasRenderingContext2D) {
    const startX = x;
    for (const character of text) {
      //ctx.drawImage(this.characterFinder(character, fontStyle), x, y, size, size);
      x += size * 1.2;
    }
  }

}

class Sprite {
  src:String;
  sx:Number;
  sy:Number;
  sw:Number;
  sh:Number;
  
  constructor(Src:String, Sx:Number, Sy:Number, Sw:Number, Sh:Number){
    this.src = Src;
    this.sx = Sx;
    this.sy = Sy;
    this.sw = Sw;
    this.sh = Sh;
  }

}


class SkyEater {
  // Declaring Variables
  textWriter = new TextWriter();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;


  constructor() {
    this.canvas = document.getElementById('game') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.loadResources();
  }

  // Loads all images being used
  async loadResources() {
    try {
    const [img1, img2] = await Promise.all([this.loadImage(), this.loadImage()]);
    
    // ctx.drawImage(img1, 0, 0, 500, 500, 0, 0, 100, 100);

    } catch (e) {
      console.error("WTF?", e);
    }
  }

  // Loads individual images
  loadImage(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const testImage = new Image();
      testImage.src = "./Fonts/Title.png";
      testImage.onload = () => {
        resolve(testImage);
      };
      testImage.onerror = (e) => { reject(e); }
    });
  }


}


new SkyEater();
