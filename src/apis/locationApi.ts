import axiosClient from "./axiosClient.ts";

const LocationApi =  {
    updateLocation: ( lat: number, long: number) =>{
        const url = "/location/update-location"
        return axiosClient.post(url ,{lat: lat, long: long})
    },
    getMembersLocation: () =>{
        const url = "/location/members-location"
        return axiosClient.get(url)
    }
}


export default LocationApi
