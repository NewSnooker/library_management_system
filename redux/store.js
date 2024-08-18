//Create the Store

import { configureStore } from "@reduxjs/toolkit";
import loadingFullScreenSlice from "./slices/loadingFullScreenSlice";

export const store = configureStore({
  reducer: {
    loadingFull: loadingFullScreenSlice,
  },
});
