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
  private letterSpacing = 1.1;
  constructor() {}

  private getLetterSpriteIdx(ASCIICode: number) {
    return ASCIICode - 97;
    // if the letter is lowercase a then this should return 0
  }

  private getSpriteSheetIdx(FontStyle: string) {
    switch (FontStyle) {
      case "Title":
        this.letterSpacing = 1.1;
        return 0
      default:
        throw new console.error("That is not a registered font");
    }
  }

  public writeTitle(text: string, x: number, y: number, width: number, height: number, spritelib: SpriteLib, ctx: CanvasRenderingContext2D) {
    this.letterSpacing = 1.1;
    for (const letter of text) {
      spritelib.drawSprite(0, 0, this.getLetterSpriteIdx(letter.toLowerCase().charCodeAt(0)), x, y, width, height, ctx);
      x += width * this.letterSpacing;
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

  public getSpriteSheetImg(sheetIdx: number) {
    return this.spriteLib[sheetIdx].srcImg;
  }
  public getSpriteSheet(sheetIdx: number) {
    return this.spriteLib[sheetIdx];
  }

  public getAnimation(sheetIdx: number, animationIdx: number) {
    return this.spriteLib[sheetIdx][animationIdx];
  }

  public drawSprite(sheetIdx: number, animationIdx: number, spriteIdx: number, x: number, y: number, width: number, height: number, ctx:CanvasRenderingContext2D) {
    const sprite = this.spriteLib[sheetIdx].spriteSheet[animationIdx][spriteIdx];
    ctx.drawImage(sprite.src, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x, y, width, height);
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
    this.textWriter.writeTitle("Hello", 50, 50, 100, 100, this.spriteLib, this.ctx);
  }

  // Loads all images being used



}


new SkyEater();
