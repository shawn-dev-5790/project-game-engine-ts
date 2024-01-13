enum EEventName {
  preload = "preload",
  ready = "ready",
  watch = "watch",
  start = "start",
  stop = "stop",
  pointer = "pointer",
}
type TEventName = keyof typeof EEventName;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TEventListener = (data?: any) => void;
type TEventListenerData = Parameters<TEventListener>[number];

/**
 * 이벤트 관리자 클래스입니다.
 * 애플리케이션에서 발생하는 다양한 이벤트를 관리합니다.
 */
class EventManager {
  private static readonly instance: EventManager = new EventManager();
  private events: Map<TEventName, TEventListener[]> = new Map();

  /**
   * 클래스 초기화를 위한 내부 메서드입니다.
   * 주어진 이벤트 목록에 해당하는 빈 배열을 생성하여 초기화합니다.
   */
  private init() {
    Object.keys(EEventName).forEach((eventName: string) => {
      this.events.set(eventName as TEventName, []);
    });
  }

  private constructor() {
    if (EventManager.instance) {
      throw new Error("싱글톤 클래스입니다. getInstance 메소드를 사용하세요");
    }
    this.init();
  }

  /**
   * EventManager의 인스턴스를 반환합니다.
   * @returns {EventManager} EventManager의 인스턴스
   */
  public static getInstance(): EventManager {
    return EventManager.instance;
  }

  /**
   * 지정된 이벤트에 대한 리스너를 등록합니다.
   * @param {TEventName} eventName - 등록할 이벤트의 이름
   * @param {TEventListener} listener - 등록할 이벤트 리스너
   */
  public on(eventName: TEventName, listener: TEventListener): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    const listeners = this.events.get(eventName);
    if (listeners) {
      this.events.set(eventName, listeners.concat(listener));
    }
  }

  /**
   * 지정된 이벤트에 등록된 특정 리스너를 제거합니다.
   * @param {TEventName} eventName - 제거할 이벤트의 이름
   * @param {TEventListener} listener - 제거할 이벤트 리스너
   */
  public off(eventName: TEventName, listener: TEventListener): void {
    const listeners = this.events.get(eventName);
    if (listeners) {
      this.events.set(
        eventName,
        listeners.filter((prev) => prev !== listener)
      );
    }
  }

  /**
   * 지정된 이벤트에 등록된 모든 리스너에게 데이터를 전달합니다.
   * @param {TEventName} eventName - 전달할 이벤트의 이름
   * @param {TEventListenerData} data - 전달할 데이터
   */
  public emit(eventName: TEventName, data: TEventListenerData): void {
    const listeners = this.events.get(eventName);
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }
}

export default EventManager.getInstance();
