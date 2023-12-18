import { useEffect, useRef } from "react";
/**
 * useWebWorker 实现离线缓存的自定义hooks
 * @param workerPath
 * @returns
 */
const useWebWorker = (workerPath: string): Worker | null => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const workerInstance = new Worker(workerPath);
    workerRef.current = workerInstance;

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [workerPath]);

  return workerRef.current;
};

export default useWebWorker;