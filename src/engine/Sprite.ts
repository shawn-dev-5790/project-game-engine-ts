class Sprite {
  private elapsed: number = 0;
  private frameIdx: number = 0;

  constructor(
    private width: number,
    private height: number,
    private duration: number = 0,
    private frames: number[][] = []
  ) {}

  public get frame() {
    const [x, y] = this.frames[this.frameIdx];
    return {
      x: x * this.width,
      y: y * this.height,
      w: this.width,
      h: this.height,
    };
  }

  public animate(delta: number): void {
    this.elapsed += delta;

    if (this.elapsed < this.duration) return;
    this.elapsed = 0;

    if (this.frameIdx === this.frames.length - 1) {
      this.frameIdx = 0;
      return;
    }
    this.frameIdx += 1;
  }
}

export default Sprite;
