import axiosClient from './axiosClient.ts';

const userApi = {
  currentUser: () => {
    const url = `/user/current-user/`
    return axiosClient.get(url)
  },
  editUser: (id: string, name: string, birthday: Date | null) => {
    const url = `/user/update-info/${id}`;
    return axiosClient.put(url, { name: name, birthday: birthday })
  },

  updateFCMToken: (uid: string, token: string[]) => {
    const url = `/user/update-fcmtoken/${uid}`;
    return axiosClient.put(url, { token })
  }
};

export default userApi;
