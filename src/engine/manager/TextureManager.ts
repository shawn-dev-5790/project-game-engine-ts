class TextureManager {
  private textures: Map<string, HTMLImageElement> = new Map();

  public loadTexture(key: string, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        this.textures.set(key, image);
        resolve();
      };
      image.onerror = reject;
      image.src = path;
    });
  }

  public getTexture(key: string): HTMLImageElement | undefined {
    return this.textures.get(key);
  }
}

const textureManager = new TextureManager();
textureManager.loadTexture("idle", "/Idle.png");
console.log("d");

export default textureManager;
