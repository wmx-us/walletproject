import { useLatest } from "ahooks";
import { useCallback, useEffect, useRef, useState } from "react";

const noop = (): void => {};

/**
 * @description 自定义倒计时定时器
 * @param initCount
 * @param param1
 * @returns { start count}
 */
const useCountdown = (
  initCount: number,
  { onEnd = noop, countdownCb = noop },
) => {
  const endFnRef = useLatest(onEnd);
  const cbFnRef = useLatest(countdownCb);
  const [count, setCount] = useState<number>(0); // 倒计时没开始的时候 0
  const timer = useRef<NodeJS.Timeout | undefined>();
  const countDowning = useRef<boolean>(false); // 标志当前是否正在倒计时

  useEffect(() => {
    return () => {
      // 这里销毁定时器，
      timer.current && clearInterval(timer.current);
      countDowning.current = false;
    };
  }, []);

  useEffect(() => {
    if (countDowning.current && count !== initCount) {
      // 这个为值 cbFnRef.current(count) 异常抛出错误
      cbFnRef.current();
      if (count === 0) {
        countDowning.current = false;
        endFnRef.current();
      }
    }
  }, [count, initCount]);

  const start = useCallback(() => {
    countDowning.current = true;
    setCount(initCount);
    timer.current = setInterval(() => {
      setCount((pre) => {
        if (pre === 1) {
          timer.current && clearInterval(timer.current);
        }
        return pre - 1;
      });
    }, 1000);
  }, [initCount]);

  return { start, count };
};

export default useCountdown;
