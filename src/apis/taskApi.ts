import axiosClient from "./axiosClient";

const taskApi = {
    createTask: (formData: FormData) => {
        const url = `/task/create`;
        return axiosClient.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
    },
    getSingleTask: (tid: string) => {
        const url = `/task/single/${tid}`
        return axiosClient.get(url);
    },
    getTasks: (lastIndex?: number) => {
        const url = `/task/tasks${lastIndex ? `?lastDataIndex=${lastIndex}` : ''}`;
        return axiosClient.get(url);
    }
}


export default taskApi;