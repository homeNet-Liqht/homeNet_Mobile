import axiosClient from './axiosClient.ts';

const authApi = {
  login: (email: string, password: string) => {
    const url = '/auth/signin'
    return axiosClient.post(url,{email: email, password: password})
  },
  signUp: (data: any) => {
    const url = '/auth/signup';
    return axiosClient.post(url, data);
  },
  SendOtpConfirmation: ({email, otp}: any) => {
    const url = `/auth/otp/verify`;
    return axiosClient.post(url, {otp: otp, email: email});
  },
};

export default authApi;
