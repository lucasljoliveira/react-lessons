import { useState, useEffect } from "react";

export function useFetch(fetchFunc, initialData){
    const [fetchedData, setfetchedData] = useState(initialData);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const data = await fetchFunc();
            setfetchedData(data);
          } catch (er) {
            setError({message: er.message || "Failed to fetch data."})
          };
          setIsFetching(false);
        }
        fetchData();
      }, [fetchFunc]);

    return {
        fetchedData,
        setfetchedData,
        isFetching,
        error,
    }
}