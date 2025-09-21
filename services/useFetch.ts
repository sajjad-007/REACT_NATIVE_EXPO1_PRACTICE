import { useEffect, useState } from 'react';

//<T>(fetchFunction: () => Promise<T>) means “I accept a fetch function that returns a promise of some type T, and I’ll make sure to return that same type.”
const useFetch = <T>(theFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const results = await theFunction();
      setData(results);
    } catch (err) {
      //In JavaScript and React Native, Error is a built-in class that represents an error object.
      //instanceof checks if a value is an instance of a specific class.
      setError(
        err instanceof Error ? err : new Error('Error from useFect fetchData')
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, isLoading, error, reset, refetch: fetchData };
};

export default useFetch;
