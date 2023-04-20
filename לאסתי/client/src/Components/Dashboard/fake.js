import {Get} from '../../Hooks/fetchWithHook';



function Fake()
{
    const {data: dataFake, loading:loadingFake, error:errorFake, refetch:refetchFake} = Get("dash/fake/7");
    console.log(dataFake);
    if (loadingFake) return <p>Loading...</p>;
    if (errorFake){ return <p>Error!</p>;}
    console.log(dataFake[0].fake);


    return (

        <span>{dataFake[0].fake}</span>

    )
}
export default Fake;