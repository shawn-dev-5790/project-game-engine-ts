class GameTime {
  fps: number = 1; // 초당 프레임 수
  scale: number = 1; // 시간 스케일
  lastUpdatedAt: number = 0; // 마지막으로 업데이트된 시간
  now: number = 0; // 현재 시간

  constructor(fps: number, scale: number) {
    this.fps = fps;
    this.scale = scale;
  }

  // 경과 시간을 반환합니다. delta = (현재 시간 - 마지막 업데이트된 시간) * 시간 스케일
  get delta(): number {
    return (this.now - this.lastUpdatedAt) * this.scale;
  }

  // 프레임당 소요 시간을 반환합니다. tick = (1초 / 초당 프레임 수) * 시간 스케일
  get tick(): number {
    return (1000 / this.fps) * this.scale;
  }

  // 업데이트 가능 여부를 반환합니다.
  get canUpdate(): boolean {
    return this.delta > this.tick;
  }

  /**
   * 게임 루프를 업데이트합니다.
   * @param timestamp 현재 타임스탬프
   * @param funs 게임 루프 업데이트에 필요한 함수들의 배열
   */
  update(timestamp: number, funs: Array<(delta: number) => void>): void {
    this.now = timestamp;
    if (this.canUpdate) {
      funs.forEach((fn) => fn(this.delta));
      this.lastUpdatedAt = timestamp;
    }
  }
}

export default GameTime;
