import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router.jsx';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RouterProvider} from 'react-router-dom';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
