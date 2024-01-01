import ASSETS from "../../config/assets.json";

class AssetManager {
  private imgaes: Map<string, HTMLImageElement> = new Map();
  private reqLoadCnt: number = 0;
  private sucLoadCnt: number = 0;

  private autoIncrementReqLoadCnt() {
    this.reqLoadCnt += 1;
  }
  private autoIncrementSucLoadCnt() {
    this.sucLoadCnt += 1;
  }
  public get percentLoaded() {
    return Math.floor((this.sucLoadCnt / this.reqLoadCnt) * 100);
  }
  public load(key: string, path: string): Promise<void> {
    this.autoIncrementReqLoadCnt();
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.onerror = reject;
      img.onload = () => {
        this.imgaes.set(key, img);
        this.autoIncrementSucLoadCnt();
        resolve();
      };
    });
  }
  public get(key: keyof (typeof ASSETS)[number]): HTMLImageElement | void {
    return this.imgaes.get(key);
  }
}

// exec
const asset = new AssetManager();

// preload assets
for (const a of ASSETS) asset.load(a.name, a.path);

export default asset;
