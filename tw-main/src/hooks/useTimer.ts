import { useState } from "react";

const DEFAULT_TIMEOUT = 300;

export function useTimer(timeout = DEFAULT_TIMEOUT) {
  const [time, setTime] = useState(0);
  let interval: NodeJS.Timer | null = null;
  function start() {
    interval = setInterval(
      () => setTime((currTime) => currTime + timeout),
      timeout
    );
  }
  function stop() {
    clearInterval(interval);
    setTime(0);
  }

  return { start, stop, time };
}
