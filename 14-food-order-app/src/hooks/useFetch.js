import { useEffect, useState } from "react";

export default function useFetch(defaultData, fetchFn){
    const [data, setData] = useState(defaultData);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function asyncFetchFn(fetchFn){
            setIsFetching(true)
            try {
                const result = await fetchFn()
                setData(result)
            }
            catch (er) {
                setError({message: er.message || "Failed to fetch data"})
            }
            setIsFetching(false);
        }
        asyncFetchFn(fetchFn)
    }, [fetchFn])

    return {
        data,
        setData,
        isFetching,
        error
    }
}