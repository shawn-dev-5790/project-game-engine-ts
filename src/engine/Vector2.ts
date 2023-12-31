// 2차원 벡터 클래스
class Vector2 {
  constructor(public x: number, public y: number) {}

  /**
   * 벡터 덧셈
   * @param other 더할 다른 벡터
   * @returns 벡터 덧셈 결과
   */
  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  /**
   * 벡터 뺄셈
   * @param other 뺄 다른 벡터
   * @returns 벡터 뺄셈 결과
   */
  subtract(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  /**
   * 벡터 곱하기 (스칼라 곱)
   * @param scalar 스칼라 값
   * @returns 스칼라와 곱한 결과 벡터
   */
  multiplyScalar(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  /**
   * 벡터 크기 계산
   * @returns 벡터의 크기
   */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * 벡터 정규화
   * @returns 단위 벡터
   */
  normalize(): Vector2 {
    const mag = this.magnitude();
    return new Vector2(this.x / mag, this.y / mag);
  }

  /**
   * 내적 계산
   * @param other 다른 벡터
   * @returns 내적 결과
   */
  dotProduct(other: Vector2): number {
    return this.x * other.x + this.y * other.y;
  }
}

export default Vector2;
