import CookieManager from "@react-native-cookies/cookies";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {authApi} from "../apis";

const handleRefreshToken = async () =>{
    try {
        const res = await authApi.refreshToken()
        await CookieManager.get(`${process.env.REACT_APP_API_URL}/auth/refresh`).then((cookies) =>{
                useAsyncStorage("accessToken").setItem(cookies.accesstoken.value)
                useAsyncStorage("refreshToken").setItem(cookies.refreshtoken.value)
        })
    }catch (e) {
        console.log(e)
    }

}

export default handleRefreshToken
