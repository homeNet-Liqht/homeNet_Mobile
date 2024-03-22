import axiosClient from "./axiosClient";

const familyApi = {
    getFamily: () => {
        const url = '/family/';
        return axiosClient.get(url);
    },
    create: (FormData: FormData) =>{
        const url = "/family/create";
        return axiosClient.post(url, FormData, {headers: {"Content-Type" : "multipart/form-data"}})
    },
    getFamilyLink: () => {
        const url="/family/generate";
        return axiosClient.post(url)
    },
    join: (id: string) => {
        const url = `/family/join`;
        return axiosClient.post(url,{groupId: id})
    }
}

export default familyApi;
