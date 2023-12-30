import GameTime from "./GameTime";

export default class GameLoop {
  private running: boolean = false;
  private renderingTime: GameTime = new GameTime(1, 1);
  private calculateTime: GameTime = new GameTime(3, 1);

  public start(): void {
    if (this.running) return;
    this.running = true;
    this.loop();
  }
  public stop(): void {
    if (!this.running) return;
    this.running = false;
  }

  private loop(frame: number = 0) {
    if (!this.running) return;

    this.calculateTime.update(performance.now(), [this.update]);
    this.renderingTime.update(frame, [this.render]);

    requestAnimationFrame((frame) => this.loop(frame));
  }
  private update(delta: number): void {
    console.log("this.calculateTime.update", delta);
  }
  private render(delta: number): void {
    console.log("this.renderingTime.update", delta);
  }
}
