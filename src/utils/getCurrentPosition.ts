import {requestLocationPermission} from "./requestDevices.tsx";
import getCurrentLocation from "./currentLocation.tsx";


const fetchCurrentLocation = async () => {
    try {
        const granted = await requestLocationPermission();
        if (granted) {
            const position: any = await getCurrentLocation();
            return position
        }
    } catch (error) {
        console.error("Error getting location:", error);
    }

}
export default fetchCurrentLocation
