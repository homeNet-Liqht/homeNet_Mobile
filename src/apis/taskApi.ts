import axiosClient from "./axiosClient";

const taskApi = {
    createTask: async (formData: FormData) => {

        const url = `/task/create`;
        return axiosClient.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
    },

    getTasks: async (lastIndex?: number) => {
        const url = `/task/tasks${lastIndex ? `?lastDataIndex=${lastIndex}` : ''}`;
        return axiosClient.get(url);

    }
}


export default taskApi;