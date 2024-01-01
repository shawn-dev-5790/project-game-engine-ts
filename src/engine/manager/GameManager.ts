import GameLoop from "../GameLoop";

class GameManager {
  private gameLoop: GameLoop | null = null;

  public init(canvas: HTMLCanvasElement) {
    this.gameLoop = new GameLoop(canvas, 30, 5);
  }
  public start() {
    this.gameLoop?.start();
  }
  public stop() {
    this.gameLoop?.stop();
  }
  public isRunning(): boolean {
    return !!this.gameLoop?.isRunning;
  }
}

// exec
const game = new GameManager();

export default game;
