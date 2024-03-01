import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
    },
    editUser: (state, action) => {
      state.userData = action.payload
    },
    removeUser: state => {
      state.userData = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addUser, removeUser, editUser } = userSlice.actions;

export const userSelector = (state: any) => state.userReducer.userData;
