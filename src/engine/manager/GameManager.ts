import GameLoop from "../GameLoop";

class GameManager {
  private gameLoop: GameLoop | null = null;

  public init(canvas: HTMLCanvasElement) {
    this.gameLoop = new GameLoop(canvas, 30, 20);
  }
  public start() {
    this.gameLoop?.start();
  }
  public stop() {
    this.gameLoop?.stop();
  }
}

// exec
const game = new GameManager();

export default game;
