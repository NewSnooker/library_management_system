//Create a slice
//Create reducers
//export the reducer and export reducer

const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  loading: false,
};

const loadingFullScreenSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { isLoading } = loadingFullScreenSlice.actions;
export default loadingFullScreenSlice.reducer;
