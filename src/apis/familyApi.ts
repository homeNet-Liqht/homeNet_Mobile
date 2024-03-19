import axiosClient from "./axiosClient";

const familyApi = {
    getFamily: () => {
        const url = '/family/';
        return axiosClient.get(url);
    }
}

export default familyApi;