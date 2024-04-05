import {configureStore, combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

import authReducer from './auth/auth-slice';
import {authApi} from './auth/auth-api';

import packageJson from '../../package.json';

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: packageJson.appName,
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [authApi.middleware];

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(middlewares),
  devTools: true,
});

const persistor = persistStore(store);

export {store, persistor};
