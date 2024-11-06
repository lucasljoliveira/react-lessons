import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok){
        throw new Error(
            responseData.message || "Something went wrong, failed to send request."
        );
    }

    return responseData
}

export default function useHttp(url, config, defaultData){
    const [data, setData] = useState(defaultData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData(){
        setData(defaultData)
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try {
                const resultData = await sendHttpRequest(url, {...config, body: data});
                setData(resultData);
            } catch (error) {
                setError(error.message || "Something went wrong!")
            }
            setIsLoading(false)
        }, [url, config]
    )

    useEffect(() => {
        if (!config || config && (config.method === "GET" || !config.method)) {
            sendRequest();
        }
    }, [sendRequest, config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}
