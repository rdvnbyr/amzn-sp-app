import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import router from './router';

import {store, persistor} from './redux/store.js';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
);
