import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer.ts';
import { userReducer } from './reducers/userReducer.ts';
import { taskReducer } from './reducers/taskReducer.ts';
const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    taskReducer
  },
});

export default store;
