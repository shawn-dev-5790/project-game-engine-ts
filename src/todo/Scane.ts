// Scene 추상 클래스
export abstract class Scene {
  abstract loadScene(sceneName: string): void;
  abstract unloadScene(sceneName: string): void;
}
