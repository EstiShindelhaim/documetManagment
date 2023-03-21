// import useAxios from 'axios-hooks'
// import axios from 'axios';

// export const get=async(url,param)=>{
//   try {
//     const response = await axios.get(`${url}/${param}`);
//     // const response = await axios.get('localhost:5000/manager/1');
//     console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
//     console.log(response.data);
//     console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

//   } catch (error) {
//     console.log(error);
//   }
// }

// const get=async(url)=>{
//     try {
//       const response = await axios.get(`${url}`);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }



// const get = (url,param) => {
//   const [{ data, loading, error }, refetch] = useAxios(
//     {
//   // url:`http://localhost:4321/${url}/${param}`,
//   url:"http://localhost:4321/file/getfiles",
//   method:'post'}
// );
//   return { data, loading, error, refetch }
// };
// export default get;