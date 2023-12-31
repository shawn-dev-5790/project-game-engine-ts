// Audio 추상 클래스
export abstract class Audio {
  abstract play(sound: string): void;
  abstract pause(sound: string): void;
  abstract stop(sound: string): void;
}
