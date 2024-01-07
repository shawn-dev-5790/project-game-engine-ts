import GameLoop from "../GameLoop";

class GameManager {
  private static readonly instance: GameManager = new GameManager();
  private gameLoop: GameLoop | null = null;

  private constructor() {
    if (GameManager.instance) {
      throw new Error("싱글톤 클래스입니다. getInstance 메소드를 사용하세요");
    }
  }

  public static getInstance(): GameManager {
    return GameManager.instance;
  }

  public init(canvas: HTMLCanvasElement, fps: number, speed: number) {
    this.gameLoop = new GameLoop(canvas, fps, speed);
  }

  public start() {
    this.gameLoop?.start();
  }

  public stop() {
    this.gameLoop?.stop();
  }
}

export default GameManager.getInstance();
