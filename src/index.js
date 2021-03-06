import React from 'react';
import { render } from 'react-dom';
import store, {history, persistor} from './store'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'


import App from './App';
import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY_NOTIFICATION_EXPERIMENT,
  authDomain: "notification-experiment.firebaseapp.com",
  databaseURL: "https://notification-experiment.firebaseio.com",
  projectId: "notification-experiment",
  storageBucket: "notification-experiment.appspot.com",
  messagingSenderId: "563333451279"
};

firebase.initializeApp(config);
firebase.firestore().enablePersistence()

// {/* <PersistGate loading={null} persistor={persistor}> */}
// {/* </PersistGate> */}
render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
  </Provider>, document.getElementById('root'));
