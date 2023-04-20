import axios from 'axios';
import { URL } from '../Constant';

 const Delete= async(url, body={})=>
{
  try{
    console.log(body);
    const res= await axios.delete(url, {data:body});
  }
  catch(err){
  console.error(`error ${err}`);
  }

}

 const Create= async(url, filesToCreate)=>
{
  try{
    const res= await axios.post(url, filesToCreate);
    console.log(res);
    return res.data;
  }
  catch(err){
  console.error(`error ${err}`);
  }

}


const Update= async(url, objToUpdate)=>
{
  try{
    const res= await axios.put(`${URL}${url}`, objToUpdate);
    console.log(res);
    return res.data;
  }
  catch(err){
  console.error(`error ${err}`);
  }

}


export {Delete, Create, Update}