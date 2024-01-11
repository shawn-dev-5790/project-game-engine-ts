import Dummy from "../entity/Dummy";
import { performanceChecker } from "../util/performanceChecker";
import Renderer from "./Renderer";
import Time from "./Time";
import EventManager from "./manager/EventManager";

export default class GameLoop {
  private running: boolean;
  private screen: Renderer;
  private draw: Time;
  private calc: Time;
  private dummys: Dummy[];

  constructor(canvas: HTMLCanvasElement, fps: number, speed: number) {
    this.running = false;
    this.screen = new Renderer(canvas.getContext("2d")!);
    this.draw = new Time(fps, 1);
    this.calc = new Time(1, speed);
    this.dummys = Array.from({ length: 10 }, () => new Dummy());
    // this.dummys = [
    //   new Dummy(),
    //   new Dummy(),
    //   new Dummy(),
    //   new Dummy(),
    //   new Dummy(),
    //   new Dummy(),
    //   new Dummy(),
    //   new Dummy(),
    // ];
    console.log(this.dummys);
  }

  public get isRunning() {
    return this.running;
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

  @performanceChecker
  private loop(frame: number = 0) {
    if (!this.running) return;

    // 게임 로직 업데이트
    this.calc.update(performance.now(), [
      // () => console.log("%cupdated", "color: white; background: blue;"),
      (delta: number) =>
        this.dummys.forEach((obj) => obj.update(delta / this.calc.tick)),
      (delta: number) => EventManager.emit("watch", delta),
    ]);

    // 랜더링 프레임 업데이트
    this.draw.update(frame, [
      // () => console.log("%crendered", "color: black; background: gold;"),
      () => this.screen.clear(),
      (delta: number) =>
        this.dummys.forEach((obj) => obj.render(delta, this.screen)),
    ]);

    requestAnimationFrame((frame) => this.loop(frame));
  }
}
