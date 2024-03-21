import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import the reducers
import authReducer from '../auth/core/auth-slice';

// set up the persistConfig
const persistConfig = {
  auth: {
    key: 'amzn-sp:auth',
    storage,
    whitelist: [],
  }
};

// configure the store
const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig.auth, authReducer),
  },
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
});

// set up the persistor
const persistor = persistStore(store);

// finally export the store and the persistor
export {store, persistor};
