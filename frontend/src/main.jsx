import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, orderBy } from "firebase/firestore";
import "./index.css";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyDSMyX2ReENydlXZzzKtL9YJYouEnl2LiI",
  authDomain: "cinematch-26fb3.firebaseapp.com",
  projectId: "cinematch-26fb3",
  storageBucket: "cinematch-26fb3.appspot.com",
  messagingSenderId: "445265166333",
  appId: "1:445265166333:web:416e8d66e922bba0592394",
  measurementId: "G-TQWLM63T18",
};

import Navigation from "./components/Navigation";
import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatRoom from "./pages/ChatRoom";

import "./App.css";
import "./index.css";

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FireStoreDB = getFirestore(FirebaseApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/chat" element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

export { FirebaseApp, FireStoreDB };
