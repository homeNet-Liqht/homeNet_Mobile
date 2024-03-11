import {createSlice} from "@reduxjs/toolkit";



const authSlice =  createSlice({
    name: 'auth',
    initialState:{
        authData: '',
        isAccess: false
    },
    reducers: {
        addAuth : (state, action) => {
            state.authData = action.payload
        },
        removeAuth: (state, action) =>{
            state.authData = ''
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
