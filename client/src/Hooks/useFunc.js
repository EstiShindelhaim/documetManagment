import axios from "axios";

const url1 = "http://localhost:5000/";

export const useFunc = () => {
    const postData = async (url, body) => {
        console.log(url);
        try {
            const res = await axios.post(`${url1}${url}`, body);
            console.log(res);
        }
        catch (err) {
            return err;
        }

    }

    const getData = async (url, params) => {
        try {
            console.log(url);
            const res = await axios.get(`${url1}${url}/${params}`);
            console.log(res);
            return res
        }
        catch (err) {
            return err;
        }
    };

    const updateData = async (url, params, body) => {
        try {
            console.log(url);
            const res = await axios.put(`${url1}${url}/${params}`, body);
            console.log(res);
            return res
        }
        catch (err) {
            return err;
        }
    };

    const deteteData = async (url, params) => {
        try {
            console.log(url);
            const res = await axios.delete(`${url1}${url}/${params}`);
            console.log(res);
            return res
        }
        catch (err) {
            return err;
        }
    };

    return { getData, postData, updateData, deteteData }
}
