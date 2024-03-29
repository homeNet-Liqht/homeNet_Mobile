import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskRefresh: {
            refresh: ""

        }
    },
    reducers: {
        refreshTask: (state,action) => {
            state.taskRefresh.refresh = action.payload
        },

    }
});

export const taskReducer = taskSlice.reducer;
export const { refreshTask } = taskSlice.actions;

export const taskSelector = (state: any) => state.taskReducer.taskRefresh;
