import axiosClient from './axiosClient.ts';

const userApi = {
  currentUser: () => {
    const url = `/user/current-user/`
    return axiosClient.get(url)
  },
  editUser: (id: string, name: string, birthday: Date | null, phone: string) => {
    const url = `/user/update-info/${id}`;
    return axiosClient.put(url, { name: name, birthday: birthday , phone: phone})
  },
    updateFCMToken: (uid: string, token: string[]) => {
        const url = `/user/update-fcmtoken/${uid}`;
        return axiosClient.put(url, { token })
    },

    updateImage: (FormData: FormData,id: string) => {
        const url = `/user/profile-image/${id}`
        return axiosClient.put(url, FormData, {headers: {"Content-Type" : "multipart/form-data"}})
    }
};

export default userApi;
