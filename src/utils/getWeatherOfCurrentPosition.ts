import axios from "axios";




const getWeatherOfCurrentPosition = async (latitude:string,longitude:string ) => {
    try {
        return await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_APP_API}`
        )
    }catch (e:any) {
        console.log("can't get the weather in your position", e.data)
    }
}

export default getWeatherOfCurrentPosition
