import axios from "axios";

export const useFunc = () => {
    const postData = async (url, body) => {
        console.log(url);
        try {
            const res = await axios.post(`http://localhost:5000/${url}`,body);
            console.log(res);
        }
        catch (err) {
            console.error(`error ${err}`);
        }

    }

    const getData =async (url, params) => {
        try {
            console.log(url);
            const res = await axios.get(`http://localhost:5000/${url}/${params}`);
            console.log(res);
            return res
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    const updateData =async (url, params,body) => {
        try {
            console.log(url);
            const res = await axios.put(`http://localhost:5000/${url}/${params}`,body);
            console.log(res);
            return res
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    return { getData,postData,updateData }
}
