import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from '@/auth/core/auth-slice';

// set up the persistConfig
const persistConfig = {
  auth: {
    key: 'asp-auth',
    storage: storage,
    whitelist: [],
  },
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig.auth, authSlice),
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const persistor = persistStore(store);
export default store;
