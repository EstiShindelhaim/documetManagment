


async function  getAllFiles (filter)
{
    console.log(filter);
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(filter),
        headers: {"Content-Type": "application/json"}
    };
    const response= await fetch('http://localhost:4321/file/getfiles', requestOptions)
    const data= await response.json();
    return data;

}



export default getAllFiles;