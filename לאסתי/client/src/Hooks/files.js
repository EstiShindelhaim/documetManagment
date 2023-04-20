import useAxios from 'axios-hooks'
import axios from 'axios';

export const GetAllFiles = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    {
  url:"http://localhost:4321/file/getfiles",
  method:'post'}
);
  return { data, loading, error, refetch }
};



export const DeleteFiles= async(filesToDelete)=>
{
  try{
    const res= await axios.delete('http://localhost:4321/file', {data:{"filesToDelete":filesToDelete}});
    console.log(res);
  }
  catch(err){
  console.error(`error ${err}`);
  }

}

export const CreateFile= async(filesToCreate)=>
{
  try{
    const res= await axios.post('http://localhost:4321/file', 
    filesToCreate);
    console.log(res);
  }
  catch(err){
  console.error(`error ${err}`);
  }

}