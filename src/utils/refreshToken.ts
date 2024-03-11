import CookieManager from "@react-native-cookies/cookies";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {authApi} from "../apis";

const handleRefreshToken = async () =>{
    await authApi.refreshToken()
    return await CookieManager.get(`${process.env.REACT_APP_API_URL}/auth/refresh`)

}

export default handleRefreshToken
