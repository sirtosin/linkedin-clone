import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {};

export const articleSlice = createSlice({
  name: "article",
  initialState: { value: initialStateValue },
  reducers: {
    postArticle: (state, action) => {
      state.value = action.payload;
    },
    getArticles: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { postArticle, getArticles } = articleSlice.actions;

export default articleSlice.reducer;
