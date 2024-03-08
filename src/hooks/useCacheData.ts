import { message } from "antd";
import { useEffect, useState } from "react";

interface Cache<T> {
  data: T | null;
  loading: boolean;
}

const useCacheData = <T>(
  apiFunction: () => Promise<T>,
  cacheKey: string,
): Cache<T> => {
  const [cache, setCache] = useState<Map<string, T>>(new Map());
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const cachedData = cache.get(cacheKey);

        if (cachedData) {
          setData(cachedData);
        } else {
          const apiData = await apiFunction();
          setCache((prevCache) => new Map(prevCache.set(cacheKey, apiData)));
          setData(apiData);
        }
      } catch (error) {
        message.error("Error fetching data:" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiFunction, cache, cacheKey]);

  return { data, loading };
};

export default useCacheData;
