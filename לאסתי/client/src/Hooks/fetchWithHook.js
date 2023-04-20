import useAxios from 'axios-hooks'
import {URL} from '../Constant'

const Post = (url, body={}) => {

    const [{ data, loading, error }, refetch]= useAxios(
        {
            url:url,
            method:'post',
            data:body
        }
    );
    if(error)
        console.log(error);
   
    return { data, loading, error, refetch };
  
};

const Get = (url) => {

  const [{ data, loading, error }, refetch]= useAxios(URL + url
      // {
      //     url:url,
      //     method:'get',
      // }
  );
  
  if(error)
      console.log(error);
  return { data, loading, error, refetch };

};

export {Post, Get}