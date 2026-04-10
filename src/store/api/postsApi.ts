import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from './usersApi'; // Import usersApi from the correct file path
import authSlice from "../slices/authSlice";
export { authSlice }; // Export authSlice

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            usersApi.middleware
        ),
});

