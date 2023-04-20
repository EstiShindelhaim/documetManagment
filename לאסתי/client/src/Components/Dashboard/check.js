
import {Get} from '../../Hooks/fetchWithHook';



function Check()
{
    

    const {data, loading, error, refetch } = Get("dash/check/7");
    
    if (loading) 
    {
        return <p>Loading...</p>;
}
    if (error){ return <p>Error!</p>;}




    return (
        <>
       <span>{data[0].UnderCheck}</span>
        </>
    )
}
export default Check;