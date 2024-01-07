import GameLoop from "../GameLoop";

/**
 * 게임 매니저 클래스입니다.
 * 게임 루프를 초기화하고 게임을 시작 또는 중지하는 기능을 제공합니다.
 */
class GameManager {
  private static readonly instance: GameManager = new GameManager();
  private gameLoop: GameLoop | null = null;

  private constructor() {
    if (GameManager.instance) {
      throw new Error("싱글톤 클래스입니다. getInstance 메소드를 사용하세요");
    }
  }

  /**
   * GameManager의 인스턴스를 반환합니다.
   * @returns {GameManager} GameManager의 인스턴스
   */
  public static getInstance(): GameManager {
    return GameManager.instance;
  }

  /**
   * 게임 루프의 준비 여부를 확인합니다.
   * @returns {boolean} 게임 루프의 준비 여부
   */
  public get isReady(): boolean {
    return Boolean(this.gameLoop);
  }

  /**
   * 게임 루프의 실행 여부를 확인합니다.
   * @returns {boolean} 게임 루프의 실행 여부
   */
  public get isRunning(): boolean {
    return this.gameLoop?.isRunning || false;
  }

  /**
   * 새로운 게임 루프를 초기화합니다.
   * @param {HTMLCanvasElement} canvas - 게임 루프에 사용될 캔버스 엘리먼트
   * @param {number} fps - 게임 루프의 초당 프레임 수
   * @param {number} speed - 게임 루프의 진행 속도
   */
  public init(canvas: HTMLCanvasElement, fps: number, speed: number) {
    this.gameLoop = new GameLoop(canvas, fps, speed);
  }

  /**
   * 게임 루프를 시작합니다.
   */
  public start() {
    this.gameLoop?.start();
  }

  /**
   * 게임 루프를 중지합니다.
   */
  public stop() {
    this.gameLoop?.stop();
  }
}

export default GameManager.getInstance();
