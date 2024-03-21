import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskRefresh: {
            refresh: false

        }
    },
    reducers: {
        addTask: (state) => {
            state.taskRefresh.refresh = false
        },
        refreshTask: (state) => {
            state.taskRefresh.refresh = true
        },

    }
});

export const taskReducer = taskSlice.reducer;
export const { refreshTask, addTask } = taskSlice.actions;

export const taskSelector = (state: any) => state.taskReducer.taskRefresh;