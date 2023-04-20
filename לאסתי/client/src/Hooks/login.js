import useAxios from 'axios-hooks'

export const GetOfficer=(username,password)=>
{
    console.log("GetOfficer func");
    const [{ data, loading, error }, refetch] = useAxios(
        {
      url:`http://localhost:4321/officer/${username}/${password}`,
      method:'get'}
    );
      return { data, loading, error, refetch }
}