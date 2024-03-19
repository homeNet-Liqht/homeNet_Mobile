import axios from "axios";

const reverseGeoCode = async (lat: number, long: number) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=0OPlFVVJSTYFPB-K40HdhGU8wcF6Xb895fCoJ5m1xhM&at=${lat},${long}&lang=en-US`;

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        return items[0].address;
      }
    } catch (error) {
      console.log(error);
    }
  };

export default reverseGeoCode