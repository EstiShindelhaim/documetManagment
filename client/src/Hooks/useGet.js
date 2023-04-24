import useAxios from 'axios-hooks'
import { useEffect } from 'react'
import axios from "axios"


export default function useAxiosGet(url, params) {
    console.log((url));
    let path
    if (params) {
        path = `http://localhost:5000/${url}/${params}`
    }
    else
        path = `http://localhost:5000/${url}`
    console.log("path",path);
    const [{ data, loading, error }, refetch] = useAxios(path)
    console.log((data));
    //useEffect(() => { }, [error]);
    if(error)
    console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",error);
    return { data, loading, error, refetch }
}


