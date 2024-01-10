/* eslint-disable @typescript-eslint/no-explicit-any */

function calculatePerformancePercentage(exec: number, fps: number): string {
  const percentage = Math.ceil((exec / (1000 / fps)) * 100);
  return percentage.toFixed(0);
}

export function performanceChecker(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const origin = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now(); // 측정 시작
    const result = origin.apply(this, args);
    const end = performance.now(); // 측정 종료
    const exec = end - start;

    sessionStorage.setItem(
      "performanceChecker",
      [
        `${target.constructor.name}.${key}`,
        `exec:${exec.toFixed(2)}`,
        `144fps:${calculatePerformancePercentage(exec, 144)}%`,
        `60fps:${calculatePerformancePercentage(exec, 60)}%`,
        `30fps:${calculatePerformancePercentage(exec, 30)}%`,
      ].join(" | ")
    );

    return result;
  };

  return descriptor;
}
