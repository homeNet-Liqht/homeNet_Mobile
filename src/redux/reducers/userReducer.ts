import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      birthday: "",
      email: "",
      name: "",
      photo: "",
      fcmToken: [],
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
    },
    editUser: (state, action) => {
      state.userData = action.payload
    },
    removeUser: state => {

      state.userData = { birthday: "", email: "", name: "", photo: "", fcmToken: [] };

    },
  },
});

export const userReducer = userSlice.reducer;
export const { addUser, removeUser, editUser } = userSlice.actions;

export const userSelector = (state: any) => state.userReducer.userData;
