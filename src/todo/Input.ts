// Input 추상 클래스
export abstract class Input {
  // 사용자 입력 처리와 관련된 메서드들을 정의할 수 있어요.
  abstract getKey(key: string): boolean;
  //   abstract getMousePosition(): Vector2;
}
