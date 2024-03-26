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

    delete: (uid: string, tid: string) => {
        const url = `/task/del/${uid}/${tid}`;
        return axiosClient.delete(url);
    },

    uploadEditImage: (formData: FormData) => {
        const url = `/task/upload-edit-image`
        return axiosClient.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } })
    },
    getTasks: () => {

        const url = `/task/tasks`;

        return axiosClient.get(url);
    },

    send: (receivers: string[], type: string, task_id?: string) => {
        console.log("aaaa");

        const url = `/notification/send`
        return axiosClient.post(url, {receivers: receivers, type: type, task_id: task_id})

    },
    getOwnTask : () =>{
        const url = "task/current-user-tasks"
        return axiosClient.get(url)
    },

    getTaskById : (id: string) =>{
        const url = `task/user-task/${id}`
        return axiosClient.get(url)
    },
    getAllTaskInFamily: (day: string) => {
        const url = `/task/user-tasks-in-day`
        return axiosClient.post(url,{day: day})
    },
    acceptRequest : (id: string) => {
        const url = `task/finish/${id}`
        return axiosClient.put(url);
    }




}


export default taskApi;
