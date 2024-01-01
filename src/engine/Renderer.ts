class Renderer {
  constructor(public ctx: CanvasRenderingContext2D) {}

  public clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  public drawStrokeRect(body: { x: number; y: number; w: number; h: number }) {
    this.ctx.strokeRect(body.x, body.y, body.w, body.h);
  }
  public drawImg(
    img: HTMLImageElement | void,
    frame: { x: number; y: number; w: number; h: number },
    body: { x: number; y: number; w: number; h: number }
  ) {
    if (!img) return;
    this.ctx.drawImage(
      img,
      frame.x,
      frame.y,
      frame.w,
      frame.h,
      body.x,
      body.y,
      body.w,
      body.h
    );
  }
}

export default Renderer;
