import Renderer from "./Renderer";

abstract class AbsGameObject {
  abstract update(deltaTime: number): void;
  abstract render(renderer: Renderer): void;
}

export default AbsGameObject;
