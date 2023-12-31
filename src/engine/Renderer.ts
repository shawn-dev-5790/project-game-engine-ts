class Renderer {
  constructor(public ctx: CanvasRenderingContext2D) {}

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

export default Renderer;
