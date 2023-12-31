import Vector2 from "./Vector2";

// 리지드 바디 클래스
class Rigidbody {
  constructor(
    public position: Vector2,
    public velocity: Vector2 = new Vector2(0, 0)
  ) {}

  /**
   * 속도에 따라 위치 업데이트
   * @param deltaTime 경과 시간
   */
  updatePosition(deltaTime: number): void {
    this.position = this.position.add(this.velocity.multiplyScalar(deltaTime));
  }

  /**
   * 힘을 받아 속도 업데이트
   * @param force 힘의 벡터
   * @param deltaTime 경과 시간
   */
  applyForce(force: Vector2, deltaTime: number): void {
    // F = ma, 여기서 가정하에 m = 1로 하고 계산합니다.
    this.velocity = this.velocity.add(force.multiplyScalar(deltaTime));
  }
}

export default Rigidbody;
