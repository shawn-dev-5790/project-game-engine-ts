import Vector2 from "./Vector2";

// 리지드 바디 클래스
class Rigidbody {
  constructor(
    public position: Vector2,
    public velocity: Vector2 = new Vector2(0, 0)
  ) {}

  /**
   * 속도에 따라 위치 업데이트
   * @param delta 경과 시간
   */
  updatePosition(delta: number): void {
    this.position = this.position.add(this.velocity.multiplyScalar(delta));
  }

  /**
   * 힘을 받아 속도 업데이트
   * @param force 힘의 벡터
   * @param delta 경과 시간
   */
  applyForce(force: Vector2, delta: number): void {
    // F = ma, 여기서 가정하에 m = 1로 하고 계산합니다.
    this.velocity = this.velocity.add(force.multiplyScalar(delta));
  }
}

export default Rigidbody;
