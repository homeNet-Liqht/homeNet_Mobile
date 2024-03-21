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
    updateTask: (assignees: string[], title: string, startTime: Date, endTime: Date, description: string, photo: string[], uid: string, tid: string) => {
        const url = `/task/edit/${uid}/${tid}`;
        return axiosClient.put(url, {
            assignees: assignees,
            title: title,
            startTime: startTime,
            endTime: endTime,
            description: description,
            photo: photo
        })
    },
    uploadEditImage: (formData: FormData) => {
        const url = `/task/upload-edit-image`
        return axiosClient.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } })
    },
    getTasks: (lastIndex?: number) => {
        console.log(lastIndex);
        const url = `/task/tasks${lastIndex ? `?lastDataIndex=${lastIndex}` : ''}`;
        
        return axiosClient.get(url);
    }
}


export default taskApi;