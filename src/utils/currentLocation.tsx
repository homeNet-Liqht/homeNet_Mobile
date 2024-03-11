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
      {enableHighAccuracy: false, timeout: 20000,  },
    );
  });
};

export default getCurrentLocation;
