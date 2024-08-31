//Create the Store

import { configureStore } from "@reduxjs/toolkit";
import loadingFullScreenSlice from "./slices/loadingFullScreenSlice";
import SelectBorrowUserSlice from "./slices/SelectBorrowUserSlice";

export const store = configureStore({
  reducer: {
    loadingFull: loadingFullScreenSlice,
    selectBorrowUser: SelectBorrowUserSlice,
  },
});
