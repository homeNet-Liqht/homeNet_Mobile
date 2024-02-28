import axiosClient from "./axiosClient.ts";

const authApi = {
    login: () =>{

    },
    signUp: (data: any) =>{
        const url = '/auth/signup';
        return axiosClient.post(url, data)
    },
    SendOtpConfirmation: ({email, otp} : any) =>{
        const url = `/auth/otp/verify?uid=${email}`
        return axiosClient.post(url, { otp: otp})
    }
}

export default authApi
