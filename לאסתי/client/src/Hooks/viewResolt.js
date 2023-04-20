import useAxios from 'axios-hooks'
import axios from 'axios';

export const GetAllDocumentsForFile= () => {
    const [{ data, loading, error }, refetch] = useAxios(
      {
    url:"http://localhost:4321/document/file/371",
    method:'get'}
  );
    return { data, loading, error, refetch }
  };

// export const CloseFileByOfficer= (details) => {
//   console.log("aaa");
//   console.log(details);
//     const [{ data, loading, error }, refetch] = useAxios(
//       {
//     url:"http://localhost:4321/file/401",
//     method:'put',
//     data:details}
//   );
//   console.log(data);
//     return { data, loading, error, refetch }
//   };
export const CloseFileByOfficer= async(details)=>
{
  try{
    await axios.put("http://localhost:4321/file/371", details);
  }
  catch(err){
  console.error(`error ${err}`);
  }

}

//   const Get = (url) => {

//     const [{ data, loading, error }, refetch]= useAxios(URL + url
//         // {
//         //     url:url,
//         //     method:'get',
//         // }
//     );
    
//     if(error)
//         console.log(error);
//     return { data, loading, error, refetch };
  
//   };
