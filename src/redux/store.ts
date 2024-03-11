import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer.ts';
import {userReducer} from './reducers/userReducer.ts';
const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
  },
});

export default store;
