import axiosClient from "./axiosClient";

const familyApi = {
    getFamily: () => {
        const url = '/family/';
        return axiosClient.get(url);
    },
    create: (FormData: FormData) =>{
        const url = "/family/create";
        return axiosClient.post(url, FormData, {headers: {"Content-Type" : "multipart/form-data"}})
    }
}

export default familyApi;
