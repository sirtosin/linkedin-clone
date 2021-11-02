import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    register: (state, action) => {
      state.value = action.payload;
    },
    login: (state, action) => {
      state.value = action.payload;
    },

    logout: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { register, login, logout } = userSlice.actions;

export default userSlice.reducer;
