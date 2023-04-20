
import {Get} from '../../Hooks/fetchWithHook';



function Active()
{
  
    const {data, loading, error, refetch } = Get("dash/active/7");
    
    if (loading) 
    {
        return <p>Loading...</p>;
}
    if (error){ return <p>Error!</p>;}



    return (
        <>
        <span>{data[0].active}</span>
        </>
    )
}
export default Active;