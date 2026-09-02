import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./state";
import { errorMiddleware } from "./middleware/errorHandler";
import { successMiddleware } from "./middleware/successHandler";
import authApi from "./api/authApi";
import baseApi from "./api/baseApi";
const store = configureStore({
  reducer: {
    state: stateReducer,
    [authApi.reducerPath]: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(baseApi.middleware)
      .concat(successMiddleware)
      .concat(errorMiddleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
