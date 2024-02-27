import axiosClient from "./axiosClient.ts";

const authApi = {
    login: () =>{

    },
    signUp: (data: any) =>{
        const url = '/auth/signup';
        return axiosClient.post(url, data)
    }
}

export default authApi
