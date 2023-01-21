import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Navigation from './components/Navigation';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
    <Navigation />
      <Routes>
        <Route path='/' element={<App />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
