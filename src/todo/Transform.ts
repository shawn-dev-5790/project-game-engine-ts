// Transform 추상 클래스
export abstract class Transform {
  abstract setPosition(x: number, y: number, z: number): void;
  abstract setRotation(x: number, y: number, z: number): void;
  abstract setScale(x: number, y: number, z: number): void;
}
