class Time {
  private prev: number = 0;
  private curr: number = 0;

  constructor(public fps: number, public scale: number) {
    // 생성자에서 초당 프레임 수와 시간 스케일을 받습니다.
    // fps: 초당 프레임 수
    // scale: 시간 스케일
  }

  public get now(): number {
    return performance.now();
    // 현재 시간을 반환합니다.
  }

  public get delta(): number {
    return Math.ceil((this.curr - this.prev) * this.scale);
    // 이전 프레임과 현재 프레임 사이의 시간 간격을 계산합니다.
    // scale을 곱하여 시간 스케일을 적용하고, Math.ceil을 사용하여 올림합니다.
  }

  public get tick(): number {
    return 1000 / this.fps;
    // 프레임당 소요 시간을 반환합니다. (밀리초)
  }

  public get canUpdate(): boolean {
    return this.delta > this.tick;
    // 업데이트 가능 여부를 반환합니다.
    // delta가 tick보다 크면 업데이트가 가능합니다.
  }

  public update(timestamp: number, funs: Array<(delta: number) => void>): void {
    this.curr = timestamp;
    if (!this.canUpdate) return;
    // 업데이트가 가능한지 확인하고, 가능하면 funs에 포함된 함수들을 호출합니다.
    // delta 값은 각 함수에 전달됩니다.
    funs.forEach((fn) => fn(this.delta));
    this.prev = timestamp;
    // 업데이트가 끝나면 현재 시간을 이전 시간으로 설정합니다.
  }
}

export default Time;
