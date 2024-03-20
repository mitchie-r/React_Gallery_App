import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx'
import './index.css'

const rootElement = document.getElementById('root'); // Get the DOM element 
const root = ReactDOM.createRoot(rootElement); // Create a root object

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
