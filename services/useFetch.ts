import { useEffect, useState } from "react";

const useFetch = <T>(
  fetchFunction: () => Promise<T | T[]>,
  autoFetch = true,
  deps: any[] = []
) => {
  const [data, setData] = useState<T | null | T[]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (append: Boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();

      setData((prev) => {
        if (Array.isArray(result)) {
          //pad results to be multiple of 3

          if (append && Array.isArray(prev)) {
            return [...prev, ...result];
          } else {
            return result;
          }
        } else {
          return result;
        }
      });
    } catch (error) {
      //@ts-ignore
      setError(error instanceof Error ? error : new Error(error));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, deps);

  return {
    data,
    loading,
    error,
    refetch: (append = false) => fetchData(append),
    reset,
  };
};

export default useFetch;
