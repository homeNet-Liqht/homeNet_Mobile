import {createSlice} from "@reduxjs/toolkit";

interface initialState {
    email: string,
    accessToken: string
}

const initialState: initialState = {
    email: '',
    accessToken: ''
}

const authSlice =  createSlice({
    name: 'auth',
    initialState:{
        authData: initialState,
        isAccess: false
    },
    reducers: {
        addAuth : (state, action) => {
            state.authData = action.payload
        },
        removeAuth: (state, action) =>{
            state.authData = initialState
        },
        alreadyAccess: (state, action) =>{
            state.isAccess = action.payload
        }
    }
})

export const authReducer = authSlice.reducer
export const {addAuth, removeAuth,alreadyAccess } = authSlice.actions

export const authSelector = (state: any) => state.authReducer.authData
export const isAccessSelected = (state: any) => state.authReducer.isAccess
