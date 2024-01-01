import AbsGameObject from "../engine/AbsGameObject";
import Renderer from "../engine/Renderer";
import Rigidbody from "../engine/Rigidbody";
import Sprite from "../engine/Sprite";
import Vector2 from "../engine/Vector2";
import asset from "../engine/manager/AssetManager";

const entityDummyRigidbody = new Rigidbody(
  new Vector2(0, 0),
  new Vector2(1, 1)
);
const entityDummySpriteIdle = new Sprite(
  96,
  96,
  300 / 6, // 300ms 동안 프레임 6개 전환 = 기본 duration
  Array.from({ length: 6 }, (_, i) => [i, 0])
);
const entityDummy = {
  width: 300,
  height: 300,
};

class Dummy extends AbsGameObject {
  private rigidbody: Rigidbody = entityDummyRigidbody;
  private sprite_idle: Sprite = entityDummySpriteIdle;

  public update(delta: number): void {
    this.rigidbody.updatePosition(delta);
  }
  public render(delta: number, ren: Renderer): void {
    const body = {
      x: this.rigidbody.position.x,
      y: this.rigidbody.position.y,
      w: entityDummy.width,
      h: entityDummy.height,
    };

    // draw
    ren.drawStrokeRect(body);
    ren.drawImg(asset.get("images_warrior_idle"), this.sprite_idle.frame, body);

    this.sprite_idle.animate(delta);

    // TODO:
    // 1. 인풋 시스템을 적용해 보자.
    // 2. 더미의 엔티티를 만들고 속성을 부여하자.
  }
}

export default Dummy;
