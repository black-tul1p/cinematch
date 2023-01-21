import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Navigation from './components/Navigation';
import App from './App'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Login from './pages/Login';
import Home from './pages/Home';

const firebaseConfig = {
  apiKey: "AIzaSyDSMyX2ReENydlXZzzKtL9YJYouEnl2LiI",
  authDomain: "cinematch-26fb3.firebaseapp.com",
  projectId: "cinematch-26fb3",
  storageBucket: "cinematch-26fb3.appspot.com",
  messagingSenderId: "445265166333",
  appId: "1:445265166333:web:416e8d66e922bba0592394",
  measurementId: "G-TQWLM63T18"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
    <Navigation />
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)


export { FirebaseApp }