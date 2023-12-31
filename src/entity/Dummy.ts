import AbsGameObject from "../engine/AbsGameObject";
import Renderer from "../engine/Renderer";
import Rigidbody from "../engine/Rigidbody";
import Vector2 from "../engine/Vector2";
import textureManager from "../engine/manager/TextureManager";

let fidx = 0;
class Dummy extends AbsGameObject {
  public rigidbody: Rigidbody = new Rigidbody(
    new Vector2(0, 0),
    new Vector2(1, 1)
  );

  public update(delta: number): void {
    if (fidx == 5) fidx = 0;
    else {
      fidx += 1;
    }
    this.rigidbody.updatePosition(delta);
  }
  public render({ ctx }: Renderer): void {
    const size = 100;
    const { x, y } = this.rigidbody.position;
    ctx.strokeRect(x, y, size, size);
    // TODO: 텍스쳐 메니져 완성하고 스프라이트 에니메이터 구현하기.
    const img = textureManager.getTexture("idle");
    if (img) {
      ctx.drawImage(img, fidx * 96, 0, 96, 96, x, y, size, size);
    }
  }
}

export default Dummy;
