//Create a slice
//Create reducers
//export the reducer and export reducer

const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  userId: "",
}

const selectBorrowUserSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {

    selectBorrowUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});
export const { selectBorrowUserId } = selectBorrowUserSlice.actions;
export default selectBorrowUserSlice.reducer;
