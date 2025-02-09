import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import themeReducer from "../Slices/themeSlice";
import authReducer from "../Slices/authSlice";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";

const removeErrorAndLoading = createTransform(
  (inboundState) => {
    const { error, loading, ...rest } = inboundState;
    return rest;
  },
  (outboundState) => outboundState, 
  { whitelist: ["user"] } 
);

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  transforms: [removeErrorAndLoading],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
