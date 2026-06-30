import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Questo carica Bootstrap via @import
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Questo serve per il menu mobile

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)