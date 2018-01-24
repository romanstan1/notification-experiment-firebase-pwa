import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
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

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
