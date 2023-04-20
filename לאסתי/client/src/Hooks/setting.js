
import axios from 'axios';

const url= "http://localhost:4321/officer/7";

   export const ChangeDetails = async(detailsToUpdate)=>
    {
      try{
        const res= await axios.put(url, 
          detailsToUpdate);
        console.log(res);
      }
      catch(err){
      console.error(`error ${err}`);
      }
    
    };

 
export const GetOfficer= async()=>
{
  try{
    const res= await axios.get(url);
    return res;
  }
  catch(err){
  console.error(`error ${err}`);
  }

}

//  const url= "http://localhost:4321/officer/7";
// export const GetOfficer= async()=>
// {
//   try{
//     const res= await axios.get(url);
//     return res;
//   }
//   catch(err){
//   console.error(`error ${err}`);
//   }

// }
    