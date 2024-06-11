import { useState, useEffect } from "react";
import { IResponseModel } from "../models";

const useUniqViewSeconds = (url: string) => {
  const [uniqueSortedList, setUniqueSortedList] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;
    if (!isMounted) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const callApi = async () => {
      try {
        const response = await fetch(url, { signal });
        const data: IResponseModel = await response.json();
        const allNumbers = data.numbers.flat();
        const uniqueNumbers = Array.from(new Set(allNumbers));
        const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);
        setUniqueSortedList(sortedNumbers);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
        } else {
          setError("An unknown error has occurred. Please try again later.");
        }
      }
    };

    callApi();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { uniqueSortedList, error };
};

export default useUniqViewSeconds;
