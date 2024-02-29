import Geolocation from '@react-native-community/geolocation';



const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position : any) => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      (error : any) => {
        console.warn(error.message);
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  });
};

export default getCurrentLocation;
