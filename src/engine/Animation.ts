// import SpriteSheet from "./SpriteSheet";

// class Animation {
//   private frames: number[][];
//   private frameIndex: number = 0;
//   private frameDuration: number; // in milliseconds
//   private elapsed: number = 0;

//   constructor(
//     private spriteSheet: SpriteSheet,
//     frameDuration: number,
//     ...frames: number[][]
//   ) {
//     this.frameDuration = frameDuration;
//     this.frames = frames;
//   }

//   public update(deltaTime: number): void {
//     this.elapsed += deltaTime;
//     if (this.elapsed >= this.frameDuration) {
//       this.elapsed = 0;
//       this.frameIndex = (this.frameIndex + 1) % this.frames.length;
//     }
//   }

//   public render(ctx: CanvasRenderingContext2D): void {
//     const [frameX, frameY] = this.frames[this.frameIndex];
//     this.spriteSheet.drawFrame(ctx, frameX, frameY, x, y);
//   }
// }

// export default Animation;
export {};
