import axiosClient from "./axiosClient";

const notifyApi = {
    show: () => {
        const url = `/notification/show`;
        return axiosClient.get(url)
    }
}

export default notifyApi;