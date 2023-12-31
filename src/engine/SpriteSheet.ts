class SpriteSheet {
  constructor(
    private image: HTMLImageElement,
    private frameWidth: number,
    private frameHeight: number
  ) {}

  public drawFrame(
    ctx: CanvasRenderingContext2D,
    frameX: number,
    frameY: number,
    x: number,
    y: number
  ): void {
    ctx.drawImage(
      this.image,
      frameX * this.frameWidth,
      frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      x,
      y,
      this.frameWidth,
      this.frameHeight
    );
  }
}

export default SpriteSheet;
