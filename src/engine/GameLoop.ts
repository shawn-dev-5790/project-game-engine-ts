import Dummy from "../entity/Dummy";
import Renderer from "./Renderer";
import Time from "./Time";

export default class GameLoop {
  private running: boolean;
  private screen: Renderer;
  private draw: Time;
  private calc: Time;
  private dummys: Dummy[];

  constructor(canvas: HTMLCanvasElement) {
    this.running = false;
    this.screen = new Renderer(canvas.getContext("2d")!);
    this.draw = new Time(60, 1);
    this.calc = new Time(1, 6);
    this.dummys = [new Dummy()];
  }

  public start(): void {
    if (this.running) return;
    this.running = true;
    this.loop();
    // 게임 루프 시작
  }

  public stop(): void {
    if (!this.running) return;
    this.running = false;
    // 게임 루프 중단
  }

  private loop(frame: number = 0) {
    if (!this.running) return;

    // 게임 로직 업데이트
    this.calc.update(performance.now(), [
      () => console.log("%cupdated", "color: white; background: blue;"),
      (delta: number) =>
        this.dummys.forEach((obj) => obj.update(delta / this.calc.tick)),
    ]);

    // 랜더링 프레임 업데이트
    this.draw.update(frame, [
      () => console.log("%crendered", "color: black; background: gold;"),
      () => this.screen.clear(),
      () => this.dummys.forEach((obj) => obj.render(this.screen)),
    ]);

    requestAnimationFrame((frame) => this.loop(frame));
  }
}
