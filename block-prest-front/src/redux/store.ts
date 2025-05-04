import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import userReducer from "./userSlice";



export const store = configureStore({
    reducer: {
        global: globalReducer,
        user: userReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
