import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TestResults from './TestResults';

// Check if we're in test mode via URL parameter
const urlParams = new URLSearchParams(window.location.search);
const testMode = urlParams.get('test') === 'true';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {testMode ? <TestResults /> : <App />}
  </React.StrictMode>
);
