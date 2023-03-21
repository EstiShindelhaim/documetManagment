import useAxios from 'axios-hooks'
import { useEffect } from 'react'
import axios from "axios"

export default function useAxiosGet(url,params){
    console.log((url));
    const [{ data, loading, error }, refetch] = useAxios(
        `http://localhost:5000/${url}/${params}`
    )
    console.log((data));
    useEffect(() => { }, [error]);
    return { data, loading, error, refetch }
}


