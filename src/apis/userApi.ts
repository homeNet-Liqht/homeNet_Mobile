import axiosClient from './axiosClient.ts';

const userApi = {
  currentUser: () => {
    const url = `/user/current-user/`
    return axiosClient.get(url)
  },
  editUser: (id: string, name: string, birthday: Date | null) => {
    const url = `/user/update-info/${id}`;
    return axiosClient.put(url, { name: name, birthday : birthday})
  }
};

export default userApi;
