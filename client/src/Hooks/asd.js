import useAxios from 'axios-hooks'
import axios from 'axios';
export const Get = (url, params) => {
    const [{ data, loading, error }, refetch] = useAxios(
      {
    url:`http://localhost:5000/${url}/${params}`,
      // url:"http://localhost:4321/file/getfiles",
    method:'get'}
  );
    return { data, loading, error, refetch }
  };
  export const GetAllFiles = (url, params) => {};