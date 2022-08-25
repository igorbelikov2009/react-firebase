import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDMtLyyjE3WUFJgXFJEbl7tipWoFI3_2h4",
  authDomain: "chat-react-6c14c.firebaseapp.com",
  projectId: "chat-react-6c14c",
  storageBucket: "chat-react-6c14c.appspot.com",
  messagingSenderId: "880192405133",
  appId: "1:880192405133:web:9f666f74a8a4b5c99decc4",
  measurementId: "G-EZ0BD7YVZ8",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ firebase, auth, firestore }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
