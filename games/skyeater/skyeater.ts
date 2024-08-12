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

class SpriteLib {
  private readonly spriteLib: ReadonlyArray<SpriteSheet>;
  readonly isLoaded: Promise<void>;

  constructor() {
    let sprites: Array<SpriteSheet> = [];
    this.isLoaded = this.loadResources(sprites);
    this.spriteLib = sprites;
    console.log(this.spriteLib[0]);
  }

  private async loadResources(sprites:Array<SpriteSheet>) {
    try {

    const [testFont] = await Promise.all([this.loadImage("./Fonts/Title.png")]);
    //this.ctx.drawImage(img1, 0, 0, 500, 500, 0, 0, 100, 100);
    
    // ----------------------------------
    //for each of the fonts this will be repeated (nested for loop)
    let spriteArray: Array<Sprite> = [];
    for (let i = 0; i < 26; i ++) {
      spriteArray.push(new Sprite(testFont, (i % 5) * 500, Math.floor(i / 5) * 500, 500, 500));
    }
    // creates the new spritesheet
    let spriteSheet: SpriteSheet = new SpriteSheet(testFont);
    spriteSheet.addAnimation(spriteArray);
    // adds it to the library
    sprites.push(spriteSheet);
    // ----------------------------------

    } catch (e) {
      console.error("WTF?", e);
      throw e
    }
  }

  // Loads individual images
  private loadImage(img:string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const newImage = new Image();
      newImage.src = img;
      newImage.onload = () => {
        resolve(newImage);
      };
      newImage.onerror = (e) => { reject(e); }
    });
  }

  public getSpriteSheet(sheetIdx: number) {
    return this.spriteLib[sheetIdx].srcImg;
  }

  public getAnimation(sheetIdx: number, animationIdx: number) {
    return this.spriteLib[sheetIdx][animationIdx];
  }

  public getSprite(sheetIdx: number, animationIdx: number, spriteIdx: number) {
    return this.spriteLib[sheetIdx][animationIdx][spriteIdx];
  }

  
}

class SpriteSheet {
  spriteSheet: Array<Array<Sprite>> = [];
  srcImg: HTMLImageElement;

  constructor(SRC:HTMLImageElement) {
    this.srcImg = SRC;
  }

  public addAnimation(animation:Array<Sprite>) {
    this.spriteSheet.push(animation);
  }

}

class Sprite {
  src: HTMLImageElement;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  
  constructor(Src:HTMLImageElement, Sx:number, Sy:number, Sw:number, Sh:number){
    this.src = Src;
    this.sx = Sx;
    this.sy = Sy;
    this.sw = Sw;
    this.sh = Sh;
  }

}


class SkyEater {
  // Declaring Variables
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  textWriter = new TextWriter();
  spriteLib:SpriteLib;

  constructor() {
    this.canvas = document.getElementById('game') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.spriteLib = new SpriteLib();
    void this.run();
  }

  async run() {
    await this.spriteLib.isLoaded;
    this.ctx.drawImage(this.spriteLib.getSpriteSheet(0), 0, 0, 500, 500, 0, 0, 200, 200);
  }

  // Loads all images being used



}


new SkyEater();
