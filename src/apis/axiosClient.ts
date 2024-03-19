import axios from 'axios';
import queryString from "query-string";
import CookieManager from "@react-native-cookies/cookies";
import {addAuth} from "../redux/reducers/authReducer.ts";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import handleRefreshToken from "../utils/refreshToken.ts";


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // Modify the request configuration
    config.headers['Authorization'] = ``;
    return config;

})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response;
    }
    return response;
}, (error) => {
    const {response, config} = error;
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
    }else {
        return Promise.reject(error.response); // No need to refresh tokens, reject with original error response
    }

});
export default axiosClient;
