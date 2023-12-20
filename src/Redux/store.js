import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from "./userStore.js";


const persistConfig = { key: "userLogin", storage, version: 1 };
const userLoginPersistedReducer = persistReducer(persistConfig, userSlice.reducer);


export const store = configureStore({
    reducer: {
        userLogin: userLoginPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
