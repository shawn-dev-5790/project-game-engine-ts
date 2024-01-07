import ASSETS from "../../config/assets.json";
import EventManager from "./EventManager";

/**
 * 자원(Asset) 관리자 클래스입니다.
 * 이미지 등의 자원을 비동기적으로 로드하고, 관리합니다.
 */
class AssetManager {
  private static readonly instance: AssetManager = new AssetManager();
  private images: Map<string, HTMLImageElement> = new Map();
  private reqLoadCnt: number = 0;
  private sucLoadCnt: number = 0;

  /**
   * 클래스 초기화를 위한 내부 메서드입니다.
   * ASSETS에서 정의된 자원들을 비동기적으로 로드합니다.
   */
  private init(): void {
    for (const asset of ASSETS) this.load(asset.name, asset.path);
  }

  /**
   * 요청된 자원 로드 횟수를 자동으로 증가시키는 내부 메서드입니다.
   */
  private autoIncrementReqLoadCnt(): void {
    this.reqLoadCnt += 1;
  }

  /**
   * 성공적으로 로드된 자원 횟수를 자동으로 증가시키는 내부 메서드입니다.
   */
  private autoIncrementSucLoadCnt(): void {
    this.sucLoadCnt += 1;
  }

  private constructor() {
    if (AssetManager.instance) {
      throw new Error("싱글톤 클래스입니다. getInstance 메소드를 사용하세요");
    }
    this.init();
  }

  /**
   * AssetManager의 인스턴스를 반환합니다.
   * @returns {AssetManager} AssetManager의 인스턴스
   */
  public static getInstance(): AssetManager {
    return AssetManager.instance;
  }

  /**
   * 로드된 자원의 로딩 퍼센티지를 반환하는 게터 메서드입니다.
   * @returns {number} 로딩 퍼센티지 (0 ~ 100)
   */
  public get percentLoaded() {
    return Math.floor((this.sucLoadCnt / this.reqLoadCnt) * 100);
  }

  /**
   * 자원을 비동기적으로 로드합니다.
   * @param {string} key - 자원의 키
   * @param {string} path - 자원의 경로
   * @returns {Promise<void>} 로드 완료 후 Promise를 반환합니다.
   */
  public load(key: string, path: string): Promise<void> {
    this.autoIncrementReqLoadCnt();
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.onerror = reject;
      img.onload = () => {
        this.images.set(key, img);
        this.autoIncrementSucLoadCnt();
        EventManager.emit("preload", this.percentLoaded);
        resolve();
      };
    });
  }

  /**
   * 지정된 키에 해당하는 로드된 이미지를 반환합니다.
   * @param {keyof (typeof ASSETS)[number]} key - 자원의 키
   * @returns {HTMLImageElement | void} 이미지 엘리먼트 또는 undefined
   */
  public get(key: keyof (typeof ASSETS)[number]): HTMLImageElement | void {
    return this.images.get(key);
  }
}

export default AssetManager.getInstance();
