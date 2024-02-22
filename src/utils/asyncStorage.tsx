import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key:any, value: any) =>{
    try {
        await  AsyncStorage.setItem(key, value);
    }catch (e){
        console.log("Error storing value", e)
    }
}

export const getItem =  async (key:any) =>{
    try{
        const value = await AsyncStorage.getItem(key);
        return value;

    }catch (e) {
        console.log('Error retrieving value ', e)
    }
}
export const removeItem =  async (key:any) =>{
    try{
        await AsyncStorage.removeItem(key)
    }catch (e) {
        console.log('Error deleting value ', e)
    }
}

