import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice";

const store = configureStore({
    reducer: authReducers
    // reducer: {
    //     auth: authReducers
    // }
})

export default store;
