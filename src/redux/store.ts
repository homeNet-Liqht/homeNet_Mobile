import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/authReducer.ts";

const store = configureStore({
    reducer: {
        authReducer,
    }
})

export default store
