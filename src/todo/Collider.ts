export abstract class Collider {
  // 충돌 처리에 필요한 메서드들을 정의할 수 있어요.
  abstract checkCollision(otherCollider: Collider): boolean;
}
