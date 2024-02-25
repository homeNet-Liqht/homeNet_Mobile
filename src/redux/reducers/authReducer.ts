import {createSlice} from "@reduxjs/toolkit";

interface initialState {
    id: string,
    email: string,
    accessToken: string
}

const initialState: initialState = {
    id: '',
    email: '',
    accessToken: ''
}

const authSlice =  createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth : (state, action) => {
            state.authData = action.payload
        }
    }
})

export const authReducer = authSlice.reducer
export const {addAuth } = authSlice.actions

export const authSelector = (state: any) => state.authReducer.authData
