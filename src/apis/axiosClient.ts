import axios from 'axios';
import queryString from "query-string";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import handleRefreshToken from "../utils/refreshToken.ts";


const axiosClient = axios.create({
    baseURL: "http://52.62.46.94:8000",
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    config.headers['Authorization'] = ``;
    return config;

})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response;
    }
    return response;
}, (error) => {
    const { response, config } = error;
    const status = response?.status;
    if (status === 401 || status === 403) {
        try {
            handleRefreshToken().then((cookies: any) => {
                useAsyncStorage("accessToken").setItem(cookies.accesstoken.value)
                useAsyncStorage("refreshToken").setItem(cookies.refreshtoken.value)
            })
            const retryConfig = { ...config };
            return axiosClient(retryConfig);

        } catch (e) {

        }
    }
    return Promise.reject(error.response)
});
export default axiosClient;
