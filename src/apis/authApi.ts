import axiosClient from './axiosClient.ts';

const authApi = {
  login: (email: string, password: string) => {
    const url = '/auth/signin'
    return axiosClient.post(url, { email: email, password: password })
  },
  signUp: (data: any) => {
    const url = '/auth/signup';
    return axiosClient.post(url, data);
  },
  SendOtpConfirmation: ({ email, otp, type }: any) => {
    const url = `/auth/otp/verify`;
    return axiosClient.post(url, { otp: otp, email: email, type: type });
  },
  ForgotPassword: (email: string) => {
    const url = "/auth/otp/password"
    return axiosClient.post(url, { email: email })
  },
  ResetPassword: (email: string, newPassword: string) => {
    const url = "/user/reset-password"
    return axiosClient.post(url, { email: email, newPassword: newPassword })
  },
  SignInWithGoogle: async (user: object) => {
    const url = "/auth/social-login"

    return axiosClient.post(url, user)
  },
  refreshToken: () =>{
    const url = "/auth/refresh"
    return axiosClient.post(url,{})
  }
};

export default authApi;
