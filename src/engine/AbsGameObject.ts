import Renderer from "./Renderer";

abstract class AbsGameObject {
  abstract update(delta: number): void;
  abstract render(delta: number, ctx: Renderer): void;
}

export default AbsGameObject;
