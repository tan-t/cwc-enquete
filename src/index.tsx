import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAEmoTh2iLFjs7PQ1lq63yAhEsvFTOKV10",
  authDomain: "cwc2020-2746f.firebaseapp.com",
  databaseURL: "https://cwc2020-2746f.firebaseio.com",
  projectId: "cwc2020-2746f",
  storageBucket: "cwc2020-2746f.appspot.com",
  messagingSenderId: "879743059523",
  appId: "1:879743059523:web:070d3a41bd35e5b168f6f6",
  measurementId: "G-MLZ4W2C028"
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
