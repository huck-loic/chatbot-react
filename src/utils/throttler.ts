export function throttler(ms: number) {
  let lastTime = 0;
  let timeout: number;

  return function throttler(fn: () => void) {
    const now = Date.now();
    const elapsed = now - lastTime;
    clearTimeout(timeout);

    if (elapsed > ms) {
      lastTime = now;
      fn();
    } else {
      timeout = setTimeout(() => {
        lastTime = now;
        fn();
      }, elapsed);
    }
  };
}
